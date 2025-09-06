import { useEffect, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import SortButtons from "../components/SortButtons";
import usePost from "../hooks/usePost";
import type { Order } from "../types/Order";
import type { Post } from "../types/Post";
import PostInfoCard from "../components/PostInfoCard";
import { useAppSelector } from "../app/hooks";

export default function PostsPage() {
    const [order, setOrder] = useState<Order>("newest")
    const [userPosts, setUserPosts] = useState<Post[]>([])
    const [otherPosts, setOtherPosts] = useState<Post[]>([])
    const { post: posts = [], isLoading } = usePost(order)
    const isGuest = useAppSelector((s) => s.auth.isGuest)
    const user = useAppSelector((s) => s.auth.user)

    useEffect(() => {
        if (isGuest) {
            setUserPosts([])
            setOtherPosts(posts)
            return
        }
        if (user && posts) {
            const myPosts = posts.filter((post: Post) =>
                user.postIDs?.includes(post._id)
            )

            const others = posts.filter(
                (post: Post) => !user.postIDs?.includes(post._id)
            )

            setUserPosts(myPosts)
            setOtherPosts(others)
        }
    }, [isGuest, user, posts]);

    return (
        <Stack spacing={2}>
            <SortButtons value={order} onChange={setOrder} />
            {isLoading ? (
                <div></div>
            ) : (
                isGuest ?
                    (
                        <>
                            <Divider sx={{ borderColor: "#989898" }} />
                            <Typography> Posts </Typography>
                            <PostInfoCard posts={otherPosts} />
                        </>
                    )
                    :
                    (
                        <>
                            <Divider sx={{ borderColor: "#989898" }} />
                            <Typography> Your Post </Typography>
                            {userPosts.length == 0 ? (<Typography>You haven't made any posts yet</Typography>) : (<PostInfoCard posts={userPosts} />)}
                            <Divider sx={{ borderColor: "#989898" }} />
                            <Typography> Other Post </Typography>
                            <PostInfoCard posts={otherPosts} />
                        </>
                    )
            )}
        </Stack >
    );
}
