import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api" // your axios instance
import { toast } from "react-toastify";

function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(true);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/admin/product/${id}`);
        console.log(res);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/admin/product/edit/${id}`, product);
      toast.success("Product updated successfully");
      navigate("/product");
    } catch (error) {
      toast.error("Error in updating product");
      console.error(error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="discount"
          value={product.discount}
          onChange={handleChange}
          placeholder="Discount %"
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-2 rounded"
        />

        {/* Colors */}
        <div className="flex gap-4">
          <input
            type="color"
            name="bgColor"
            value={product.bgColor}
            onChange={handleChange}
          />
          <input
            type="color"
            name="panelColor"
            value={product.panelColor}
            onChange={handleChange}
          />
          <input
            type="color"
            name="textColor"
            value={product.textColor}
            onChange={handleChange}
          />
        </div>

        {/* isActive */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={product.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:opacity-90 transition"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}

export default AdminProductEdit;
