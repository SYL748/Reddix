import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { logout } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setLogout } from "../features/authSlice";
import { Link as RouterLink } from "react-router-dom";

export const Banner = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        mutate: signOut
    } = useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ["user"] })
            queryClient.removeQueries({ queryKey: ["community"] })
            dispatch(setLogout())
            navigate('/login', { replace: true })
        }
    })
    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "#fff",
                borderBottom: "1px solid #ccc",
            }}
        >
            <Toolbar>
                <Typography
                    component={RouterLink}
                    to="/"
                    variant="h4"
                    color="primary"
                    fontWeight={900}
                    sx={{ display: "flex", alignItems: "center", textDecoration: "none", cursor: "pointer" }}
                >
                    <RssFeedIcon sx={{ fontSize: "inherit" }} />
                    reddix
                </Typography>

                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "40%"
                    }}
                >
                    <SearchBar />
                </Box>

                <Box sx={{ marginLeft: "auto" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => signOut()}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
