import { useEffect } from "react";
import { useState } from "react";

const Sidebar = ({ setFilters }) => {
  const [open, setOpen] = useState(false);
  const [collection, setcollection] = useState("all");
  const [discount, setDiscount] = useState(null);
  const [sort, setSort] = useState("newest");
  const [inStock, setInStock] = useState(false);

  useEffect(() => {
    setFilters({
      collection,
      inStock,
      discount,
      sort
    })
  }, [collection, discount, sort, inStock])

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-20 left-3 z-50 bg-white p-2 rounded-lg shadow-md active:scale-95"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 bg-white border-r border-gray-200
        min-h-screen min-w-60 max-w-60 p-5 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <h2 className="text-lg font-semibold mb-6">Filters</h2>

        {/* Collections */}
        <div className="mb-8">
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Collections
          </p>
          <div className="space-y-2">
            {[
              { key: "all", label: "All products" },
              { key: "new", label: "New arrivals" },
              { key: "discounted", label: "Discounted" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setcollection(item.key)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition
                ${
                  collection === item.key
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-8">
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Availability
          </p>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
              className="accent-black w-4 h-4"
            />
            In stock only
          </label>
        </div>

        {/* Discount */}
        <div className="mb-8">
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Discount
          </p>
          <div className="flex flex-wrap gap-2">
            {[10, 20, 30, 50].map((d) => (
              <button
                key={d}
                onClick={() => setDiscount(d)}
                className={`px-4 py-1.5 text-xs rounded-full border transition
                ${
                  discount === d
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-black hover:text-white"
                }`}
              >
                {d}%+
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Sort by
          </p>
          <div className="space-y-2">
            {[
              { key: "newest", label: "Newest" },
              { key: "price_asc", label: "Price: Low to High" },
              { key: "price_desc", label: "Price: High to Low" },
            ].map((s) => (
              <label
                key={s.key}
                className="flex items-center gap-3 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={sort === s.key}
                  onChange={() => setSort(s.key)}
                  className="accent-black w-4 h-4"
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
