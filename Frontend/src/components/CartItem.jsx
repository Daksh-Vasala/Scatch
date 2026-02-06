function CartItem({ item, updateQuantity, removeItem }) {
  const { product, quantity } = item;
  const discount = product.discount || 0;
  const discountedPrice = product.price - product.price * (discount / 100);

  return (
    <div className="flex gap-4 bg-white shadow-sm p-4 rounded-xl">
      <img
        className="w-28 h-28 rounded-lg"
        src={product.image}
        alt={product.name}
      />

      <div className="flex-1">
        <p className="font-semibold text-lg">{product.name}</p>

        <div className="flex gap-5 items-center">
          <span className="text-gray-600">₹ {discountedPrice}</span>

          {discount > 0 && (
            <>
              <span className="text-sm line-through text-gray-400">
                ₹{product.price}
              </span>
              <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                {discount}% OFF
              </span>
            </>
          )}
        </div>
        <div className="flex gap-3 items-center mt-4">
          <button
            className="px-3 py-1 border border-gray-500 rounded-md"
            onClick={() => updateQuantity(product._id, quantity - 1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-3 py-1 border border-gray-500 rounded-md"
            onClick={() => updateQuantity(product._id, quantity + 1)}
          >
            +
          </button>
          <button className="text-xs text-red-500 hover:text-red-700 cursor-pointer">
            Remove
          </button>
        </div>
      </div>

      <span>{discountedPrice * quantity}</span>
    </div>
  );
}

export default CartItem;



