import { Types } from "mongoose"
import catchError from "../utils/catchError"
import { Request, Response } from "express";
import LinkFlair from "../model/LinkFlair";
import appAssert from "../utils/AppAssert";
import User from "../model/User";
import Post from "../model/Post";
import Community from "../model/Community";

type PostBody = {
    title: string;
    content: string;
    flairContent?: string;
    communityName: string;
}

type NewPost = {
    title: string;
    content: string;
    postedBy: string;
    linkFlairID?: Types.ObjectId;
}

const createPostHandler = catchError(async (req: Request<{}, {}, PostBody>, res: Response) => {
    const { title, content, flairContent, communityName } = req.body
    const user = await User.findById(req.session.userId)
    let newPost: NewPost
    if (!flairContent) {
        newPost = {
            title,
            content,
            postedBy: user.displayName
        }
    } else {
        let linkFlairObj = await LinkFlair.findOne({ content: flairContent })
        if (!linkFlairObj) {
            linkFlairObj = await LinkFlair.create({ content: flairContent })
        }
        newPost = {
            title: req.body.title,
            content: req.body.content,
            linkFlairID: linkFlairObj._id as Types.ObjectId,
            postedBy: user.displayName,
        }
    }
    const community = await Community.findOne({ name: communityName })
    appAssert(community, 404, "Community Not Found")
    let post = await Post.create(newPost)
    user.postIDs.push(post._id as Types.ObjectId)
    await user.save()
    community.postId.push(post._id as Types.ObjectId)
    await community.save()
    res.status(200).json(post)
})

export default createPostHandler