import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { CategoryListPage } from "@/pages/CategoryListPage";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />

        {/* Protected Routes */}
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/categories" element={<CategoryListPage />} />
        </Route>

      </Routes>
    </>
  );
}
