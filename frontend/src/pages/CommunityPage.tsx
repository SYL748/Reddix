import { Box, Divider, Stack, Typography } from "@mui/material";
import SortButtons from "../components/SortButtons";
import { useState } from "react";
import type { Order } from "../types/Order";
import { useParams } from "react-router-dom";
import useCommunityById from "../hooks/useCommunityById";
import PostInfoCard from "../components/PostInfoCard";
import usePostByCommunity from "../hooks/usePostByCommunity";

export default function CommunityPage() {
    const { id } = useParams();
    const { communityById, isCommunityByIdLoading } = useCommunityById(id!)
    const [order, setOrder] = useState<Order>("newest")
    const { postBycommunity, isPostByCommunityLoading } = usePostByCommunity(id!, order)
    if (isCommunityByIdLoading || isPostByCommunityLoading) return <div>Loading...</div>
    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <h1 style={{ width: 700, marginBottom: 10 }}>{communityById?.name}</h1>
                <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
                    <span>Post Button</span>
                    <span>Join</span>
                </Box>
            </Stack>

            <Stack spacing={0.5}>
                <Typography variant="body1" sx={{ width: 700, whiteSpace: "normal", wordBreak: "break-word" }}>
                    {communityById?.description}
                </Typography>
                <Typography variant="body2">
                    <Box sx={{ display: "flex", gap: 4 }}>
                        <span>Created Nov 12, 2020</span>
                        <span>Creator Label Here: {communityById?.creator}</span>
                    </Box>
                </Typography>
            </Stack >

            <Stack spacing={2} marginTop={1}>
                <SortButtons value={order} onChange={setOrder} />
                <Divider sx={{ borderColor: "#989898" }} />
                <PostInfoCard posts={postBycommunity ?? []} />
            </Stack>
        </>
    )
}