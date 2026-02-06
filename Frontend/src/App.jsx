import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"

function App() {
  return (
    <div className="">
      <Routes >
        <Route element={<AuthPage />} path="/auth" />
        <Route element={<HomePage />} path="/" />
        <Route element={<CartPage />} path="/cart" />
      </Routes>
    </div>
  )
}

export default App