import { Types } from "mongoose"
import catchError from "../utils/catchError"
import { Request, Response } from "express"
import appAssert from "../utils/AppAssert"
import Post from "../model/Post"
import Community from "../model/Community"
import User from "../model/User"
import deleteCommentAndReply from "../utils/deleteCommentAndReply"

const deletePostHandler = catchError(async (req: Request, res: Response) => {
    const { id } = req.params
    const userHasPost = await User.exists({
        _id: req.session.userId,
        postIDs: id
    })
    appAssert(userHasPost, 403, "You can only delete your own comment")
    const post = await Post.findById(id)
    appAssert(post, 404, "Post Not Found")
    const allDeletedCommentIds: Types.ObjectId[] = []
    for (const commentID of post.commentIDs ?? []) {
        const ids = await deleteCommentAndReply(commentID as Types.ObjectId)
        allDeletedCommentIds.push(...ids)
    }
    if (allDeletedCommentIds.length > 0) {
        await User.updateMany(
            { commentIDs: { $in: allDeletedCommentIds } },
            { $pull: { commentIDs: { $in: allDeletedCommentIds } } }
        )
    }
    await User.updateOne(
        { _id: req.session.userId },
        { $pull: { postIDs: post._id } }
    )
    await Community.updateOne(
        { postId: new Types.ObjectId(id) },
        { $pull: { postId: new Types.ObjectId(id) } }
    )
    await Post.findByIdAndDelete(id)
    res.status(200).json({ message: "Post Deleted" })
})

export default deletePostHandler