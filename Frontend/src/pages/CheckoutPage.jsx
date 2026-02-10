import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/api/cart");
        setCart(res.data);
      } catch (err) {
        toast.error("Failed to load cart");
        console.log(err);
      }
    };
    fetchCart();
  }, []);

  
  if (!cart) {
    return <div className="p-6">Loading checkout...</div>;
  }

  const {items} = cart;
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

  const placeOrder = async () => {
    if (!address.trim()) {
      return toast.error("Please enter delivery address");
    }

    try {
      
    } catch (err) {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT SECTION */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Address */}
        <div className="border rounded-xl p-5 bg-white">
          <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
          <textarea
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your complete delivery address"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Items */}
        <div className="border rounded-xl p-5 bg-white">
          <h2 className="text-lg font-semibold mb-4">Items</h2>

          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  ₹{item.priceAtAddTime * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="border rounded-xl p-5 bg-white h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span>₹{summary.totalMrp}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- ₹{summary.discount}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{summary.payable}</span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          Cash on Delivery (Demo)
        </p>
      </div>
    </div>
  );
}

export default CheckoutPage;
