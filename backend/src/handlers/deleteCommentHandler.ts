import Comment from "../model/Comment"
import appAssert from "../utils/AppAssert"
import catchError from "../utils/catchError"
import { Request, Response } from "express"
import deleteCommentAndReply from "../utils/deleteCommentAndReply"
import { Types } from "mongoose"
import User from "../model/User"
import Post from "../model/Post"

const deleteCommentHandler = catchError(async (req: Request, res: Response) => {
    const { id } = req.params
    const userHasComment = await User.exists({
        _id: req.session.userId,
        commentIDs: id
    })
    appAssert(userHasComment, 403, "You can only delete your own comment")
    const comment = await Comment.findById(id)
    appAssert(comment, 404, "Comment Not Found")
    const deletedComments = await deleteCommentAndReply(comment._id as Types.ObjectId)
    if (deletedComments.length) {
        await User.updateMany(
            { commentIDs: { $in: deletedComments } },
            { $pull: { commentIDs: { $in: deletedComments } } }
        )
    }
    if (deletedComments.length) {
        await Post.updateMany(
            { commentIDs: { $in: deletedComments } },
            { $pull: { commentIDs: { $in: deletedComments } } }
        )
    }
    return res.status(200).json({ message: "success" })
})

export default deleteCommentHandler