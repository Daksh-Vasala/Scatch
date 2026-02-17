import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

function AdminNavbar() {
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      logout();
      toast.success("Logged out successfully", { autoClose: 1000 });
    } catch (error) {
      console.log("Error in logging out", error.message);
      toast.error("Fail to logout", { autoClose: 1000 });
    }
  };

  return (
    <nav className="flex w-full justify-between p-4 border-b border-gray-300 ">
      <NavLink
        to={"/admin"}
        className="text-blue-500 font-bold text-2xl max-sm:text-xl"
      >
        Scatch
      </NavLink>
      <ul className="flex items-center justify-center gap-8 text-md font-medium max-sm:gap-4 max-sm:text-sm max-md:gap-6">
        {user ? (
          <>
            <li>
              <NavLink
                to={"/admin"}
                className={({ isActive }) => `
              transition-colors border-b-2 border-transparent pb-1 ${
                isActive
                  ? "text-black font-semibold border-black"
                  : "text-gray-500 hover:text-black hover:border-black"
              }
            `}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => `
                  transition-colors border-b-2 border-transparent pb-1 ${
                    isActive
                      ? "text-black font-semibold border-black"
                      : "text-gray-500 hover:text-black hover:border-black"
                  }
                `}
              >
                Orders
              </NavLink>
            </li>
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
                className={
                  "transition-colors text-red-500 hover:text-red-600 hover:border-red-600 border-b-2 border-transparent cursor-pointer"
                }
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => `
                transition-colors border-b-2 border-transparent pb-1 ${
                  isActive
                    ? "text-black font-semibold border-black"
                    : "text-gray-500 hover:text-black hover:border-black"
                }
              `}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/auth"}
                className={({ isActive }) => `
                transition-colors border-b-2 border-transparent pb-1 text-blue-500 hover:text-blue-600 hover:border-blue-600
                }
              `}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default AdminNavbar;
