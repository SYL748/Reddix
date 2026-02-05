import { Button, Divider, Stack, Typography } from "@mui/material"
import useCommunity from "../hooks/useCommunity"
import { useAppSelector } from "../app/hooks";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const guest = useAppSelector(s => s.auth.isGuest)
    const { community, isLoading } = useCommunity()
    const joined = community?.joined ?? []
    const others = community?.others ?? []
    if (isLoading) return <div>Loading...</div>

    return (
        guest ?
            (
                <Stack alignItems="center" px={3} gap={1} py={4}>
                    <Typography variant="h6" gutterBottom={false} fontWeight="900" color="primary">
                        Communities
                    </Typography>
                    <Divider sx={{ width: "100%" }} />
                    <Stack spacing={1} alignItems="center" sx={{ width: "100%" }} >
                        {others.map((c) => (
                            <Button
                                key={c._id}
                                component={NavLink}
                                to={`/community/${c._id}`}
                                variant="outlined"
                                sx={{
                                    width: "80%",
                                    textTransform: "none",
                                    borderRadius: 2,
                                    color: "#656565",
                                    borderColor: "#656565",
                                    "&:hover": {
                                        backgroundColor: "gray.light",
                                    },
                                    "&.active": {
                                        backgroundColor: "gray.normal",
                                        color: "white"
                                    },
                                }}
                            >
                                {c.name}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            ) :
            (
                <Stack alignItems="center" p={4} gap={1}>
                    <Typography variant="h6" gutterBottom={false} fontWeight="900" color="primary">
                        Joined Communities
                    </Typography>
                    <Divider sx={{ width: "100%" }} />
                    {joined.length > 0 ? (
                        <Stack spacing={1} alignItems="center" sx={{ width: "100%" }} >
                            {joined.map((c) => (
                                <Button
                                    key={c._id}
                                    component={NavLink}
                                    to={`/community/${c._id}`}
                                    variant="outlined"
                                    sx={{
                                        width: "75%",
                                        textTransform: "none",
                                        borderRadius: 2,
                                        color: "#656565",
                                        borderColor: "#656565",
                                        "&:hover": {
                                            backgroundColor: "gray.light",
                                        },
                                        "&.active": {
                                            backgroundColor: "gray.normal",
                                            color: "white"
                                        },
                                    }}
                                >
                                    {c.name}
                                </Button>
                            ))}
                        </Stack>
                    ) : (
                        <Typography variant="body2" align="center" sx={{ width: "100%" }}>
                            You haven&rsquo;t joined any communities yet
                        </Typography>
                    )}
                    <Typography variant="h6" gutterBottom={false} fontWeight="900" fontSize="1rem" marginTop="0.75rem" color="secondary">
                        Other Communities
                    </Typography>
                    <Divider sx={{ width: "100%" }} />
                    <Stack spacing={1} alignItems="center" sx={{ width: "100%" }} >
                        {others.map((c) => (
                            <Button
                                key={c._id}
                                component={NavLink}
                                to={`/community/${c._id}`}
                                variant="outlined"
                                sx={{
                                    width: "75%",
                                    textTransform: "none",
                                    borderRadius: 2,
                                    color: "#656565",
                                    borderColor: "#656565",
                                    "&:hover": {
                                        backgroundColor: "gray.light",
                                    },
                                    "&.active": {
                                        backgroundColor: "gray.normal",
                                        color: "white"
                                    },
                                }}
                            >
                                {c.name}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            )
    )
}

export default NavBar