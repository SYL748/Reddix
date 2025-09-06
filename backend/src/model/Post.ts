import { Schema, model, Types, Document } from "mongoose";

export interface PostDocument extends Document {
  title: string;
  content: string;
  linkFlairID?: Types.ObjectId;
  postedBy: string;
  commentIDs: Types.ObjectId[];
  views: number;
  upvotes: number;
  upvotedBy: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  url: string;
  hasUserUpvoted(userId: Types.ObjectId): boolean;
}

const PostSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    linkFlairID: { type: Schema.Types.ObjectId, ref: "LinkFlair" },
    postedBy: { type: String, required: true },
    commentIDs: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    views: { type: Number, required: true, default: 0, min: 0 },
    upvotes: { type: Number, required: true, default: 0, min: 0 },
    upvotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false }
  }
)

PostSchema.index({ createdAt: -1 })

PostSchema.virtual("url").get(function (this: PostDocument) {
  return `/post/${this._id.toString()}`
})

PostSchema.methods.hasUserUpvoted = function (userId: Types.ObjectId): boolean {
  return this.upvotedBy.some((id: Types.ObjectId) => id.equals(userId))
}

const Post = model<PostDocument>("Post", PostSchema)
export default Post;