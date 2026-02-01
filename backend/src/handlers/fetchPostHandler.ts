import Post from "../model/Post";
import appAssert from "../utils/AppAssert";
import catchError from "../utils/catchError";
import { Request, Response } from "express"

type Order = "newest" | "oldest" | "popularity"

const escapeRegex = (str: string): string =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const fetchPostHandler = catchError(async (req: Request, res: Response) => {
    const { order, search } = req.query as { order: Order, search?: string }
    appAssert(order, 400, "No Ordering Mentioned")
    const match: any = {}
    if (search && search.trim()) {
        const words = search.trim().split(/\s+/)
        match.$and = words.map((w) => {
            const safe = escapeRegex(w)
            const rx = new RegExp(safe, "i")
            return { $or: [{ title: rx }, { content: rx }] }
        });
    }
    let sortOpt: Record<string, 1 | -1> = {}
    if (order === "popularity") {
        const posts = await Post.aggregate([
            { $match: match },
            {
                $addFields: {
                    popularity: {
                        $add: [
                            { $multiply: ["$views", 0.7] },
                            { $multiply: ["$upvotes", 0.3] }
                        ]
                    }
                }
            },
            { $sort: { popularity: -1 } }
        ])
        return res.status(200).json(posts)
    }
    if (order === "newest") {
        sortOpt = { createdAt: -1 }
    } else if (order === "oldest") {
        sortOpt = { createdAt: 1 }
    }

    const posts = await Post.find(match).sort(sortOpt)
    return res.status(200).json(posts)
})

export default fetchPostHandler