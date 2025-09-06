import { Types } from "mongoose"
import appAssert from "./AppAssert"
import Comment from "../model/Comment"

const deleteCommentAndReply = async (commentId: Types.ObjectId) => {
    const deleted: Types.ObjectId[] = []
    const comment = await Comment.findById(commentId)
    appAssert(comment, 404, "Comment Not Found")
    for (const replyId of comment.commentIDs ?? []) {
        const childIds = await deleteCommentAndReply(replyId as Types.ObjectId)
        deleted.push(...childIds)
    }
    await Comment.findByIdAndDelete(commentId)
    deleted.push(comment._id as Types.ObjectId)
    return deleted
}
export default deleteCommentAndReply