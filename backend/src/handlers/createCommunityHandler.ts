import { Types } from "mongoose";
import Community from "../model/Community";
import User from "../model/User";
import appAssert from "../utils/AppAssert";
import catchError from "../utils/catchError";
import { Request, Response } from "express";

type CommunityBody = {
    name: string;
    description: string;
}

const createCommunityHandler = catchError(async (req: Request<{}, {}, CommunityBody>, res: Response) => {
    const { name, description } = req.body
    const user = await User.findById(req.session.userId)
    appAssert(user, 404, "User Not Found")
    const community = await Community.create({
        name,
        description,
        member: [user.displayName],
        creator: user.displayName
    })
    user.communityIDs.push(community._id as Types.ObjectId);
    await user.save();
    return res.status(200).json({ community })
})

export default createCommunityHandler