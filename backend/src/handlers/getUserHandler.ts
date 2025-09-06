import { Request, Response } from "express"
import User from "../model/User"
import appAssert from "../utils/AppAssert"
import catchError from "../utils/catchError"

const getUserHandler = catchError(async (req: Request, res: Response) => {
    const user = await User.findById(req.session.userId)
    appAssert(user, 404, "User not found")
    return res.status(200).json(user)
})
export default getUserHandler