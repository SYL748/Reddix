import { Box } from "@mui/material"
import { Banner } from "./Banner"
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"

const NAVBAR_W = 270

const AppWrapper = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                overflow: "hidden"
            }}
        >
            <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1 }} >
                <Banner />
            </Box>
            <Box sx={{
                display: "flex", flex: 1, pt: (t) => `${t.mixins.toolbar.minHeight}px`,
                minHeight: 0
            }}>
                <Box
                    sx={{
                        position: "fixed",
                        top: (theme) => theme.mixins.toolbar.minHeight,
                        bottom: 0,
                        left: 0,
                        width: NAVBAR_W,
                        borderRight: "1px solid #ccc",
                        overflowY: "auto",
                        overscrollBehavior: "contain"
                    }}
                >
                    <NavBar />
                </Box>
                <Box
                    sx={{
                        top: (theme) => theme.mixins.toolbar.minHeight,
                        flex: 1,
                        ml: `${NAVBAR_W}px`,
                        overflowY: "auto",
                        pt: 2,
                        pb: 3,
                        pl: 7,
                        pr: 9,
                        overscrollBehavior: "contain"
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box >
    )
}

export default AppWrapper