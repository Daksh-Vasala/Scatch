import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useEffect } from "react";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Cart", path: "/cart" },
  ];

  const handleLogout = async () => {
    try {
      const res = await api.post('/users/logout');
      console.log(res);
      setIsAuthenticated(false);
      navigate("/auth");
    } catch (error) {
      
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/users/me");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <nav className="flex w-full justify-between p-4 border-b border-gray-300 ">
      <NavLink
        to={"/home"}
        className="text-blue-500 font-bold text-2xl max-sm:text-xl"
      >
        Scatch
      </NavLink>
      <ul className="flex items-center justify-center gap-8 text-md font-medium max-sm:gap-4 max-sm:text-sm max-md:gap-6">
        {navLinks.map((elem) => (
          <li key={elem.label}>
            <NavLink
              to={elem.path}
              className={({ isActive }) => `
              transition-colors border-b-2 border-transparent pb-1 ${
                isActive
                  ? "text-black font-semibold border-black"
                  : "text-gray-500 hover:text-black hover:border-black"
              }
            `}
            >
              {elem.label}
            </NavLink>
          </li>
        ))}
        {isAuthenticated ? (
          <>
            <li>
              <NavLink
                to={"/account"}
                className={({ isActive }) => `
                  transition-colors border-b-2 border-transparent pb-1 ${
                    isActive
                      ? "text-black font-semibold border-black"
                      : "text-gray-500 hover:text-black hover:border-black"
                  }
                `}
              >
                Account
              </NavLink>
            </li>
            <li>
              <button
                className={"transition-colors text-red-500 hover:text-red-600 hover:border-red-600 border-b-2 border-transparent cursor-pointer"}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to={'/auth'}
              className={({ isActive }) => `
                transition-colors border-b-2 border-transparent pb-1 text-blue-500 hover:text-blue-600 hover:border-blue-600
                }
              `}
            >Login</NavLink>

          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
