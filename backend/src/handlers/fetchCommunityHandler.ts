import Community from "../model/Community";
import User from "../model/User";
import appAssert from "../utils/AppAssert";
import catchError from "../utils/catchError";
import { Request, Response } from "express"

const fetchCommunityHandler = catchError(async (req: Request, res: Response) => {
    const allCommunities = await Community.find()
    if (!req.session.userId) {
        return res.status(200).json({ joined: [], others: allCommunities })
    }
    const user = await User.findById(req.session.userId)
    appAssert(user, 404, "User Not Found")
    const joinedIds = new Set(user.communityIDs.map(id => id.toString()))
    const joined = allCommunities.filter(c => joinedIds.has(c._id.toString()))
    const others = allCommunities.filter(c => !joinedIds.has(c._id.toString()))
    return res.status(200).json({ joined, others })
})

export default fetchCommunityHandler