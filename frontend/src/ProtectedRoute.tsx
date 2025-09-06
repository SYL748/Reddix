import { Navigate, Outlet } from "react-router-dom";
import useUser from "./hooks/useUser";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setLogin } from "./features/authSlice";
import { useEffect } from "react";

export function ProtectedRoute() {
  const { user, isLoading } = useUser()
  const dispatch = useAppDispatch()
  const guest = useAppSelector((s) => s.auth.isGuest)
  
  useEffect(() => {
    if (user) dispatch(setLogin(user));
  }, [user, dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user && !guest) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}