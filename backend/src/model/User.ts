import { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  password: string;
  communityIDs: Types.ObjectId[];
  postIDs: Types.ObjectId[];
  commentIDs: Types.ObjectId[];
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, "password">; 
}

const UserSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    communityIDs: [{ type: Schema.Types.ObjectId, ref: "Community" }],
    postIDs: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    commentIDs: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

UserSchema.methods.comparePassword = async function (val: string) {
    return bcrypt.compare(val, this.password);
}

UserSchema.methods.omitPassword = function(){
    const user = this.toObject();
    delete user.password;
    return user;
}

const User = model<UserDocument>("User", UserSchema);
export default User;