import { useNavigate } from "react-router-dom";

function CartSummary({ items }) {
  const navigate = useNavigate();
  const summary = items.reduce(
    (acc, item) => {
      const price = item.product.price;
      const discount = item.product.discount || 0;
      const quantity = item.quantity;

      const mrp = price * quantity;
      const discountedPrice = Math.round(
        price - (price * discount) / 100
      )
      const finalPrice = discountedPrice * quantity;

      acc.totalMrp += mrp;
      acc.payable += finalPrice;
      acc.discount += mrp - finalPrice;

      return acc;
    },
    { totalMrp: 0, payable: 0, discount: 0 }
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-fit lg:sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Total MRP</span>
          <span>₹ {summary.totalMrp}</span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-2">
              Discount
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                SAVED
              </span>
            </span>
            <span>- ₹ {summary.discount}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">FREE</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₹ {summary.payable}</span>
      </div>

      {summary.discount > 0 && (
        <p className="text-sm text-green-700 mt-2 text-center">
          You saved ₹{summary.discount} on this order 🎉
        </p>
      )}

      <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90"
        onClick={() => navigate('/checkout')}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartSummary;