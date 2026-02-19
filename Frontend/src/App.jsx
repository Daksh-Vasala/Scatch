import { Route, Routes, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import MyOrders from "./components/MyOrders";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNavbar from "./components/AdminNavbar";
import AdminProductsPage from "./admin/products/pages/AdminProductPage";
import AdminProductEdit from "./admin/products/components/AdminProductEdit";
import AdminCreateProductPage from "./admin/products/pages/AdminCreateProductPage";

const ProtectedRoute = ({ children }) => {
  const {user} = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

const AdminRoute = ({ children }) => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== "admin") {
    toast.error("Access denied");
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { loading, user } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
      {user?.role == "user" ? <Navbar /> : <AdminNavbar />}
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/product"
          element={
            <AdminRoute>
              <AdminProductsPage />
            </AdminRoute>
          }
        />

        <Route
          path="/product/edit/:id"
          element={
            <AdminRoute>
              <AdminProductEdit />
            </AdminRoute>
          }
        />

        <Route
          path="/product/create"
          element={
            <AdminRoute>
              <AdminCreateProductPage />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
