import { useNavigate } from "react-router-dom";

function AdminProductCard({ product, onEdit, onDelete, onToggle }) {
  const navigate = useNavigate();
  const {
    name,
    price,
    image,
    discount,
    stock,
    collection,
    isActive,
  } = product;

  const borderColor = isActive
    ? "border-l-4 border-green-500"
    : "border-l-4 border-red-500";

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 flex flex-col gap-3 ${borderColor}`}
    >
      {/* Image */}
      <div className="w-full h-40 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="max-h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 text-sm">
        <h3 className="font-semibold text-gray-800 text-base truncate">
          {name}
        </h3>

        <div className="flex justify-between text-gray-600">
          <span>₹ {price}</span>
          {discount > 0 && (
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        <p className="text-gray-500">Stock: {stock}</p>

        <p className="text-gray-400 text-xs">
          {collection || "General"}
        </p>

        <span
          className={`text-xs font-medium ${
            isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => navigate(`/product/edit/${product._id}`)}
          className="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onToggle(product)}
          className="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>

        <button
          onClick={() => onDelete(product)}
          className="flex-1 border border-red-300 text-red-600 py-1.5 rounded-md text-sm hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminProductCard;
