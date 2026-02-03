import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
       <button
        className="md:hidden fixed top-18 transition-all left-2 cursor-pointer z-50 bg-white p-2 rounded-md shadow"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {
        open && (
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
        )
      }
      <aside className={`min-h-screen bg-white border-r border-gray-300 min-w-60 p-4 md:static z-50 fixed transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="mb-4">
          <p className="mb-2 font-medium">Collections</p>
          <ul className="space-y-2 text-sm">
            <li className="px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer font-medium">All products</li>
            <li className="px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">New Collection</li>
            <li className="px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">Discounted products</li>
          </ul>
        </div>

        <div>
          <p className="mb-2 font-medium">Filter by</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">Availability</li>
            <li className="px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer">Discount</li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
