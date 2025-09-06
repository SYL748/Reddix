import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { Order } from "../types/Order"
import { Divider, Stack, Typography } from "@mui/material"
import SortButtons from "../components/SortButtons"
import PostInfoCard from "../components/PostInfoCard"
import usePost from "../hooks/usePost"

export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const q = searchParams.get("search")
    const [order, setOrder] = useState<Order>("newest")
    const { post: posts = [], isLoading } = usePost(order, q!.toString())
    return (
        <Stack spacing={2} mt={2}>
            <SortButtons value={order} onChange={setOrder} />
            <Divider sx={{ borderColor: "#989898" }} />
            {isLoading ? (
                    <div>Loading...</div>
            ) : (posts.length == 0 ?
                (
                    <Typography variant="body1">No post with the keyword "{q}"</Typography>
                ) : (
                    <>
                        <Typography variant="body1">Search results for "{q}"</Typography>
                        <PostInfoCard posts={posts} />
                    </>
                )
            )}
        </Stack >
    )
}