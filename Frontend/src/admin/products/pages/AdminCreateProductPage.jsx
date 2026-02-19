import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../api/api";

function AdminCreateProductPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      image: "",
      description: "",
      discount: 0,
      stock: 1,
      bgColor: "#ffffff",
      textColor: "#000000",
      isActive: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/api/admin/products", data);
      navigate("/product");
    } catch (error) {
      console.error(error);
      alert("Error creating product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Create Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-lg  space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {errors.name && (
            <p className="text-red-500 border-gray-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm  font-medium mb-1">Price</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className="w-full border rounded-md border-gray-400 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            {...register("image", { required: "Image URL is required" })}
            className="w-full border rounded-md border-gray-400 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="3"
            {...register("description")}
            className="w-full border rounded-md border-gray-400 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Discount & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Discount (%)</label>
            <input
              type="number"
              {...register("discount", {
                min: { value: 0, message: "Min 0%" },
                max: { value: 100, message: "Max 100%" },
              })}
              className="w-full border border-gray-400 rounded-md px-3 py-2"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              {...register("stock", {
                min: { value: 0, message: "Stock cannot be negative" },
              })}
              className="w-full border border-gray-400 rounded-md px-3 py-2"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">BG Color</label>
            <input
              type="color"
              {...register("bgColor")}
              className="w-full h-10 border border-gray-400 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Text Color</label>
            <input
              type="color"
              {...register("textColor")}
              className="w-full h-10 border rounded-md"
            />
          </div>
        </div>

        {/* isActive */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-4 w-4"
          />
          <label className="text-sm">Active</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminCreateProductPage;
