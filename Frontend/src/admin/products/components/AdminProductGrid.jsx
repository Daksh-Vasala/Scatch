import React from "react";
import AdminProductCard from "./AdminProductCard";

function AdminProductGrid({ products, onEdit, onDelete, onToggle }) {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <AdminProductCard
          key={product._id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default AdminProductGrid;
