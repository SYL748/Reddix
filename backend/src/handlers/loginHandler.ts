import { Request, Response } from "express";
import User from "../model/User";
import appAssert from "../utils/AppAssert";
import catchError from "../utils/catchError";
type LoginBody = {
  email: string;
  password: string;
}
const loginHandler = catchError(async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  appAssert(user, 404, "Invalid email or password")
  const isValid = await user.comparePassword(password)
  appAssert(isValid, 404, "Invalid email or password")
  req.session.regenerate(err => {
    if (err) throw err;
    req.session.userId = user._id.toString();
    console.log(req.session.userId)
    res.status(200).json({ message: "Login successful" });
  });
})

export default loginHandler