import { Schema, model, Types, Document } from "mongoose";

export interface CommentDocument extends Document {
    content: string;
    commentedBy: string;
    commentIDs: Types.ObjectId[];
    upvotes: number;
    upvotedBy: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
    url: string;
    hasUserUpvoted(userId: Types.ObjectId): boolean;
}

const CommentSchema = new Schema<CommentDocument>(
    {
        content: { type: String, required: true },
        commentIDs: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        commentedBy: { type: String, required: true },
        upvotes: { type: Number, required: true, default: 0 },
        upvotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true, versionKey: false }
    }
)

CommentSchema.virtual("url").get(function (this: CommentDocument) {
    return `/comment/${this._id.toString()}`
})

CommentSchema.methods.hasUserUpvoted = function (userId: Types.ObjectId): boolean {
    return this.upvotedBy.some((id: Types.ObjectId) => id.equals(userId))
}

const Comment = model<CommentDocument>("Comment", CommentSchema)
export default Comment