
function ProductCard({ product }) {
  return (
    <div
      className="w-44 sm:w-54 lg:w-74 p-2 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      style={{ backgroundColor: product.bgColor }}
    >
      {/* Image */}
      <div className="w-full aspect-3/4 max-h-56 lg:max-h-60 xl:max-h-64 justify-center items-center mb-2 rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      {/* Name */}
      <h1
        className="text-sm font-medium line-clamp-2 mb-1"
        style={{ color: product.textColor }}
      >
        {product.name}
      </h1>

      {/* Price + discount + action */}
      <div className="flex justify-between items-center pr-2">
        <p className="text-sm font-semibold">₹ {product.price}</p>
        {product.discount !== 0 && (
          <p className="bg-white/80 rounded-full px-2 py-0.5 text-xs font-medium">
            {product.discount}%
          </p>
        )}

        <button
          className="w-8 h-8 rounded-full bg-white shadow hover:bg-green-500 hover:scale-105 hover:text-white transition-all active:scale-95 cursor-pointer flex items-center justify-center"
          title="Add to cart"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
