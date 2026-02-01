import { Types } from "mongoose";
import catchError from "../utils/catchError";
import { Request, Response } from "express";
import Comment from "../model/Comment";
import Post from "../model/Post";
import appAssert from "../utils/AppAssert";
import User from "../model/User";

type CommentBody = {
    content: string;
    isReply: boolean;
    postID?: string;
    commentID?: string;
}

const createCommentHandler = catchError(async (req: Request<{}, {}, CommentBody>, res: Response) => {
    const { content, isReply, postID, commentID } = req.body
    if (isReply) {
        appAssert(commentID, 400, "commentID is required for a reply");
    } else {
        appAssert(postID, 400, "postID is required for a top-level comment");
    }
    const user = User.findById(req.session.userId)
    const newCommentObj = await Comment.create({
        content,
        commentedBy: (await user).displayName
    })
    if (isReply) {
        const comment = await Comment.findById(commentID)
        appAssert(comment, 404, "Parent Comment Not Found")
        comment.commentIDs.push(newCommentObj._id as Types.ObjectId)
        await comment.save()
    } else {
        const post = await Post.findById(postID)
        appAssert(post, 404, "Post Not Found")
        post.commentIDs.push(newCommentObj._id as Types.ObjectId)
        await post.save()
    }
    await User.findByIdAndUpdate(
        req.session.userId,
        { $push: { commentIDs: { $each: [newCommentObj._id] } } }
    )
    return res.status(200).json(newCommentObj)
})

export default createCommentHandler