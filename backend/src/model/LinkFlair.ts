import { Schema, model, Document } from "mongoose"
export interface LinkFlairDocument extends Document {
    content: string
}
const LinkFlairSchema = new Schema<LinkFlairDocument>(
    {
        content: {type: String, required: true, trim:true}
    }
)

const LinkFlair = model<LinkFlairDocument>("LinkFlair", LinkFlairSchema)
export default LinkFlair