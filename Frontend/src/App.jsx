import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route element={<AuthPage />} path="/auth" />
        <Route element={<HomePage />} path="/" />
        <Route element={<CartPage />} path="/cart" />
      </Routes>
    </div>
  );
}

export default App;
