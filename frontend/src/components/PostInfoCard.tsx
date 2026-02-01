import { Card, CardContent, Typography, CardActionArea, Chip, Stack, Box, IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import type { Post } from "../types/Post"
import { Link as RouterLink, useNavigate } from "react-router-dom";

type Props = {
    posts: Post[],
}
const PostInfoCard = ({ posts }: Props) => {
    const navigate = useNavigate();
    if (!posts?.length) return null;

    return (
        <>
            {posts.map((p) => (
                <Card
                    key={p._id}
                    variant="outlined"
                    sx={{ borderColor: "#ccc", borderWidth: 1, borderStyle: "solid" }}
                >
                    <CardActionArea
                        component={RouterLink}
                        disableRipple
                        to={`/post/${p._id}`}
                        sx={{
                            display: "block",
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": { bgcolor: "action.hover" },
                        }}
                    >
                        <CardContent sx={{ pb: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {p.title}
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                                {p.content}
                            </Typography>
                            <Stack sx={{ flexDirection: 'row', mt: 1 }}>
                                <Chip
                                    sx={{
                                        px: 0.5,
                                        "& .MuiChip-label": { px: 0, py: 0 },
                                        "& .MuiTouchRipple-root": { display: "none" },
                                        mr: 1.5
                                    }}
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton
                                                sx={{ fontSize: "small" }}
                                                onClick={
                                                    (e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                    }
                                                }
                                            >
                                                <VisibilityOutlinedIcon fontSize="small" />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ fontWeight: 700, textAlign: "center", mx: 0.5 }}>
                                                {p.view}
                                            </Typography>
                                        </Box>
                                    }
                                >
                                </Chip>
                                <Chip
                                    sx={{
                                        px: 0.5,
                                        "& .MuiChip-label": { px: 0, py: 0 },
                                        "& .MuiTouchRipple-root": { display: "none" },
                                        mr: 1.5
                                    }}
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton
                                                sx={{ fontSize: "small" }}
                                                onClick={
                                                    (e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                    }
                                                }
                                            >
                                                <ThumbUpOutlinedIcon fontSize="small" />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ fontWeight: 700, textAlign: "center", mx: 0.5 }}>
                                                {p.upvotes}
                                            </Typography>
                                            <IconButton
                                                sx={{ fontSize: "small" }}
                                                onClick={
                                                    (e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                    }
                                                }
                                            >
                                                <ThumbDownOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    }
                                >
                                </Chip>
                                <Chip
                                    sx={{
                                        px: 0.5,
                                        "& .MuiChip-label": { px: 0, py: 0 },
                                    }}
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton
                                                sx={{ fontSize: "small" }}
                                                onClick={
                                                    (e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        navigate(`/post/${p._id}`);
                                                    }
                                                }
                                            >
                                                <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    }
                                >
                                </Chip>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </>
    )
}

export default PostInfoCard