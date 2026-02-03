import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <div className="">
      <Routes >
        <Route element={<AuthPage />} path="/" />
        <Route element={<HomePage />} path="/home" />
      </Routes>
    </div>
  )
}

export default App