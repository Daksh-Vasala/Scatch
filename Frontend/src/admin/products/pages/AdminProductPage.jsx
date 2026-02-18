import React, { useState, useEffect } from "react";
import AdminProductGrid from "../components/AdminProductGrid.jsx";
import api from "../../../api/api.js"; // Your axios instance

function AdminProductsPage() {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const products = [
  {
    _id: "1",
    name: "Wireless Headphones",
    price: 2499,
    stock: 15,
    collection: "Electronics",
    status: "Active",
    images: [
      "https://images.unsplash.com/photo-1580894908361-4a7ef38f05b8?auto=format&fit=crop&w=500&q=60"
    ]
  },
  {
    _id: "2",
    name: "Classic Leather Wallet",
    price: 799,
    stock: 40,
    collection: "Accessories",
    status: "Inactive",
    images: [
      "https://images.unsplash.com/photo-1585238342024-78dfd5c7f6b6?auto=format&fit=crop&w=500&q=60"
    ]
  },
  {
    _id: "3",
    name: "Smart Watch Series 7",
    price: 9999,
    stock: 10,
    collection: "Electronics",
    status: "Active",
    images: [
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=500&q=60"
    ]
  },
  {
    _id: "4",
    name: "Running Shoes",
    price: 3499,
    stock: 25,
    collection: "Footwear",
    status: "Active",
    images: [
      "https://images.unsplash.com/photo-1600185360776-8f2adf22b69f?auto=format&fit=crop&w=500&q=60"
    ]
  },
  {
    _id: "5",
    name: "Bluetooth Speaker",
    price: 1299,
    stock: 50,
    collection: "Electronics",
    status: "Inactive",
    images: [
      "https://images.unsplash.com/photo-1610120853860-93d27b74c4b6?auto=format&fit=crop&w=500&q=60"
    ]
  },
];


  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/products"); // Adjust endpoint
      // setProducts(res.data);
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
      await api.patch(`/api/admin/products/${product._id}/toggle`);
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
