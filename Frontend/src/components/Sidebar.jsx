const Sidebar = () => {
  return (
    <aside className="min-h-screen border-r border-gray-300 min-w-60 p-4 hidden md:block">
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
  );
};

export default Sidebar;
