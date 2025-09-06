import { Request, Response } from "express";
import catchError from "../utils/catchError";
import Community from "../model/Community";
import appAssert from "../utils/AppAssert";
import { Types } from "mongoose";
import Post from "../model/Post";
import deleteCommentAndReply from "../utils/deleteCommentAndReply";
import User from "../model/User";

const deleteCommunityHandler = catchError(async (req: Request, res: Response) => {
    const { id } = req.params
    const userHasCommunity = await User.exists({
        _id: req.session.userId,
        communityIDs: id
    })
    appAssert(userHasCommunity, 403, "You can only delete your own comment")
    const community = await Community.findById(id)
    appAssert(community, 404, "Community Not Found")
    const postIds: Types.ObjectId[] = (community.postId ?? []) as Types.ObjectId[]

    const allDeletedCommentIds: Types.ObjectId[] = []
    const allDeletedPostIds: Types.ObjectId[] = []

    for (const pId of postIds) {
        const post = await Post.findById(pId)
        appAssert(post, 404, "Post Not Found")
        for (const commentID of post.commentIDs) {
            const ids = await deleteCommentAndReply(commentID as Types.ObjectId)
            allDeletedCommentIds.push(...ids)
        }
        await Post.findByIdAndDelete(pId)
        allDeletedPostIds.push(pId)
    }
    await User.updateMany(
        {
            $or: [
                { postIDs: { $in: allDeletedPostIds } },
                { commentIDs: { $in: allDeletedCommentIds } },
                { communityIDs: community._id }
            ]
        },
        {
            $pull: {
                postIDs: { $in: allDeletedPostIds },
                commentIDs: { $in: allDeletedCommentIds },
                communityIDs: community._id
            }
        }
    )
    await Community.findByIdAndDelete(id)
    return res.status(200).json({ message: "Community Deleted" })
})

export default deleteCommunityHandler