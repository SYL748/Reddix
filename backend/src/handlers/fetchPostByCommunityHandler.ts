import { Request, Response } from "express";
import catchError from "../utils/catchError";
import Community from "../model/Community";
import appAssert from "../utils/AppAssert";
import { Types } from "mongoose";
import Post from "../model/Post";

type Order = "newest" | "oldest" | "popularity"

const fetchPostByCommunityHandler = catchError(async (req: Request, res: Response) => {
    const { id } = req.params
    const { order } = req.query as { order: Order }
    const community = await Community.findById(id)
    appAssert(community, 404, "Coummunity Not Found")
    let sortOpt: Record<string, 1 | -1> = {}
    const postIds = (community.postId ?? []) as Types.ObjectId[];
    if (order == "popularity") {
        const posts = await Post.aggregate([
            { $match: { _id: { $in: postIds } } },
            {
                $addFields: {
                    popularity: {
                        $add: [
                            { $multiply: ["$views", 0.7] },
                            { $multiply: ["$upvotes", 0.3] }
                        ]
                    }
                },
            },
            { $sort: { popularity: -1 } }
        ])
        return res.status(200).json(posts);
    }
    if(order == "newest") {
        sortOpt = { createdAt: -1 }
    } else if(order == "oldest") {
        sortOpt = { createdAt: 1 }
    }
    const posts = await Post.find({ _id: { $in: postIds } }).sort(sortOpt);
    return res.status(200).json(posts);
})

export default fetchPostByCommunityHandler