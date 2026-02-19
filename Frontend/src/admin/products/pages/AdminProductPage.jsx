import React, { useState, useEffect } from "react";
import AdminProductGrid from "../components/AdminProductGrid.jsx";
import api from "../../../api/api.js"; // Your axios instance

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/products"); // Adjust endpoint 
      console.log(res)
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
    console.log("Edit", product);
    // Open modal or navigate to edit page
  };

  const handleToggle = async (product) => {
    try {
      await api.patch(`/api/admin/products/${product._id}`);
      fetchProducts(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/api/admin/products/${product._id}`);
      fetchProducts(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Products</h2>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          + Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminProductGrid
          products={products}
          onEdit={handleEdit}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default AdminProductsPage;
