import { Schema, model, Types, Document } from "mongoose";

export interface CommunityDocument extends Document {
  name: string,
  description: string,
  postId: Types.ObjectId[],
  member: string[],
  memberCount: number,
  creator: string,
  url: string
}

const CommunitySchema = new Schema<CommunityDocument>(
    {
        name: {type: String, required: true},
        description: {type: String, required: true}, 
        postId: [{type: Schema.Types.ObjectId, ref: 'Post'}],
        member: [{type: String, required: true}],
        memberCount: {type: Number, default: 1},
        creator: {type: String, required: true}
    },
    { timestamps: true }
)

CommunitySchema.virtual("url").get(function (this: CommunityDocument) {
  return `/community/${this._id.toString()}`
})

const Community = model<CommunityDocument>("Community", CommunitySchema)
export default Community