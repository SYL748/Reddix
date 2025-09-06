import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import type { Post } from "../types/Post"
import { Link as RouterLink } from "react-router-dom";

type Props = {
    posts: Post[],
}
const PostInfoCard = ({ posts }: Props) => {
    if (!posts?.length) return null;

    return (
        <>
            {posts.map((p) => (
                <Card
                    key={p._id}
                    variant="outlined"
                    sx={{ mb: 2, borderColor: "#ccc", borderWidth: 1, borderStyle: "solid" }}
                >
                    <CardActionArea
                        component={RouterLink}
                        to={`/post/${p._id}`}
                        sx={{
                            display: "block",
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": { bgcolor: "action.hover" },
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {p.title}
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                                {p.content}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </>
    )
}

export default PostInfoCard