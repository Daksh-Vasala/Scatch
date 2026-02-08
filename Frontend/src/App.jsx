import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify"
import AccountPage from "./pages/AccountPage";
import MyOrders from "./components/MyOrders";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div className="">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Routes>
        <Route element={<AuthPage />} path="/auth" />
        <Route element={<HomePage />} path="/" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<AccountPage />} path="/account" />
        <Route element={<MyOrders />} path="/account/orders" />
        <Route element={<CheckoutPage />} path="/checkout" />
      </Routes>
    </div>
  );
}

export default App;
