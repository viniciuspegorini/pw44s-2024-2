import { NavBar } from "@/components/NavBar";
import AuthService from "@/service/AuthService";
import { Navigate, Outlet, useLocation } from "react-router-dom";


export function AuthenticatedRoutes() {
    const isAuthenticated = AuthService.isAuthenticated();
    const location = useLocation();
    return (
        isAuthenticated ? (
            <>
                <NavBar />
                <Outlet />
            </>
        ) : (
            <Navigate to="/login" state={{from: location}} replace/>
        )
    );
}