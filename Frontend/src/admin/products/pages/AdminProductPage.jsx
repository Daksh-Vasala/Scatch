import { useState, useEffect } from "react";
import AdminProductGrid from "../components/AdminProductGrid.jsx";
import api from "../../../api/api.js";
import { useNavigate } from "react-router-dom";

function AdminProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    navigate(`/admin/products/${product._id}/edit`);
  };

  const handleToggle = async (product) => {
    try {
      await api.patch(`/api/admin/products/${product._id}/toggle`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/api/admin/products/${product._id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔎 Filtered products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Products</h2>

        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => navigate("/product/create")}
        >
          + Add Product
        </button>
      </div>

      {/* 🔎 Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminProductGrid
          products={filteredProducts}
          onEdit={handleEdit}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default AdminProductsPage;
