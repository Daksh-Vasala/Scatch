import React from "react";

function AdminProductCard({ product, onEdit, onDelete, onToggle }) {
  const {
    name,
    price,
    stock,
    collection,
    status,
    images
  } = product;

  // Pick first image
  const imgSrc = images && images.length > 0 ? images[0] : "";

  // Pastel background based on status
  const bgColor = status === "Active" ? "bg-green-50" : "bg-red-50";

  return (
    <div className={`rounded-xl p-4 shadow-sm ${bgColor} flex flex-col justify-between`}>
      <div className="mb-2">
        <img src={imgSrc} alt={name} className="h-36 w-full object-cover rounded-md" />
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">₹ {price}</p>
        <p className="text-gray-600">Stock: {stock}</p>
        <p className="text-gray-600">Collection: {collection}</p>
        <p className="text-gray-600">Status: {status}</p>
      </div>

      <div className="flex justify-between mt-auto gap-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onToggle(product)}
          className="flex-1 bg-yellow-400 text-white py-1 rounded hover:bg-yellow-500"
        >
          {status === "Active" ? "Deactivate" : "Activate"}
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminProductCard;
