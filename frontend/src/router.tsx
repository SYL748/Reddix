import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "./pages/Home";
import AppWrapper from "./components/AppWrapper";
import SearchPage from "./pages/SearchPage";
import CommunityPage from "./pages/CommunityPage";
import PostDetailPage from "./pages/PostDetailPage";
export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <AppWrapper />,
                children: [
                    { index: true, element: <Home /> },
                    { path: "search", element: <SearchPage /> },
                    { path: "community/:id", element: <CommunityPage /> },
                    { path: "post/:id", element: <PostDetailPage /> },
                ],
            },
        ],
    }
])