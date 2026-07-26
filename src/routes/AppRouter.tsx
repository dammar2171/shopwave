import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/home/HomePage";
import ProductListPage from "../features/products/ProductListPage";
import ProductDetailPage from "../features/products/ProductDetailPage";
import CartPage from "../features/cart/CartPage";
import LoginPage from "../features/auth/LoginPage";
import SignupPage from "../features/auth/SignupPage";
import DesignSystemPage from "@/features/design-system/DesignSystemPage";
import AboutPage from "@/features/about/AboutPage";
import ContactPage from "@/features/contact/ContactPage";
import AuthLayout from "@/layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import WishListPage from "@/features/wishlist/WishListPage";
import CheckoutPage from "@/features/checkout/CheckoutPage";
import ProfilePage from "../features/profile/ProfilePage";
import ProfileOverview from "../features/profile/ProfileOverview";
import ChangePassword from "../features/profile/ChangePassword";
import OrderHistory from "../features/profile/OrderHistory";
import OrderTracking from "../features/profile/OrderTracking";

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboardPage from '../features/admin/AdminDashboardPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "design-System", element: <DesignSystemPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "wishlist", element: <WishListPage /> },
          {
            path: "profile",
            element: <ProfilePage />,
            children: [
              { index: true, element: <ProfileOverview /> },
              { path: "change-password", element: <ChangePassword /> },
              { path: "orders", element: <OrderHistory /> },
              { path: "orders/:id/tracking", element: <OrderTracking /> },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },

  {
  element: <ProtectedRoute requiredRole="admin" />,
  children: [
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboardPage /> },
      ],
    },
  ],
},
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
