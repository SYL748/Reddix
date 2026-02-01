import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography } from "@mui/material";
import SortButtons from "../components/SortButtons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import usePost from "../hooks/usePost";
import type { Order } from "../types/Order";
import type { Post } from "../types/Post";
import PostInfoCard from "../components/PostInfoCard";
import { useAppSelector } from "../app/hooks";

export default function PostsPage() {
    const [order, setOrder] = useState<Order>("newest")
    const [expanded, setExpanded] = useState(true);
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
                            <Accordion
                                defaultExpanded
                                disableGutters
                                elevation={0}
                                onChange={(_, isExpanded) => setExpanded(isExpanded)}
                                sx={{
                                    bgcolor: "transparent",
                                    "&:before": { display: "none" }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon fontSize="medium" sx={{ color: "black" }} />}
                                    sx={{
                                        px: 0,
                                        minHeight: 0,
                                        "& .MuiAccordionSummary-content": { my: 0 },
                                    }}
                                >
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography color="primary" fontWeight={900}>Your Posts</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {expanded ? "Hide" : "Show"}
                                        </Typography>
                                    </Box>
                                </AccordionSummary>

                                <AccordionDetails sx={{ px: 0, pb: 0, pt: 2 }}>
                                    {userPosts.length === 0 ? (
                                        <Typography>You haven't made any posts yet</Typography>
                                    ) : (
                                        <PostInfoCard posts={userPosts} />
                                    )}
                                </AccordionDetails>
                            </Accordion>

                            <Divider sx={{ borderColor: "#989898" }} />
                            <Typography color="secondary" fontWeight={900}> Other Post </Typography>
                            <PostInfoCard posts={otherPosts} />
                        </>
                    )
            )}
        </Stack >
    );
}
