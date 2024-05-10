import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Login } from "./pages/Login.tsx";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import BaseLayout from "./components/Layouts/BaseLayout.tsx";
import { ProductCreate } from "./pages/ProductCreate.tsx";
import UserOrders from "./pages/UserOrders.tsx";
import ProductEdit from "./pages/ProductEdit.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
import Products from "./pages/Products.tsx";
import Register from "./pages/Register.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseLayout>
        <Index />
      </BaseLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <BaseLayout>
        <AdminDashboard />
      </BaseLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <BaseLayout>
        <Login />
      </BaseLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <BaseLayout>
        <Register />
      </BaseLayout>
    ),
  },
  {
    path: "/products",
    element: (
      <BaseLayout>
        <Products />
      </BaseLayout>
    ),
  },
  {
    path: "/orders",
    element: (
      <BaseLayout>
        <UserOrders />
      </BaseLayout>
    ),
  },
  {
    path: "/success",
    element: (
      <BaseLayout>
        <OrderSuccess />
      </BaseLayout>
    ),
  },
  {
    path: "/products/create",
    element: (
      <BaseLayout>
        <ProductCreate />
      </BaseLayout>
    ),
  },
  {
    path: "/products/:productId",
    element: (
      <BaseLayout>
        <ProductDetails />
      </BaseLayout>
    ),
  },
  {
    path: "/products/:productId/edit",
    element: (
      <BaseLayout>
        <ProductEdit/>
      </BaseLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
