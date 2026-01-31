import { NavLink } from "react-router-dom";

function Navbar() {
  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Cart", path: "/cart" },
    { label: "Account", path: "/account" }
  ];
  return (
    <nav className="flex w-full justify-between p-4 border-b border-gray-300 ">
      <NavLink
        to={"/home"}
        className="text-blue-500 font-bold text-2xl max-sm:text-xl"
      >
        Scatch
      </NavLink>
      <ul className="flex items-center gap-8 text-md font-medium max-sm:gap-4 max-sm:text-sm max-md:gap-6">
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
        <button
          className={"transition-colors text-gray-500 hover:text-red-500 hover:border-red-500 border-b-2 border-transparent cursor-pointer"}
        >
          Logout
        </button>
      </ul>
    </nav>
  );
}

export default Navbar;
