import { useEffect, useState } from "react";
import api from "../api/api.js";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders/my");
      setOrders(res.data); // ✅ correct
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      setCancellingId(orderId);

      const res = await api.patch(`/api/orders/cancel/${orderId}`);

      fetchOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading orders...</div>;
  }

  if (orders?.length === 0) {
    return <div className="p-6 text-center">You have no orders yet.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl shadow-sm bg-white p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-semibold text-lg">
                  Order #{order._id?.slice(-6)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-4 border-t pt-4">
              {order.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {item.product?.name || "Product"}
                    </p>
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

            {/* Footer */}
            <div className="border-t mt-6 pt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Payment: {order.paymentMethod} ({order.paymentStatus})
              </div>

              <div className="text-xl font-semibold">
                Total: ₹{order.totalAmount}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-t mt-6 pt-4 text-sm text-gray-700">
              <p className="font-semibold mb-1">Shipping Address</p>
              <p>{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.phone}</p>
              <p>
                {order.shippingAddress?.addressLine},{" "}
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state},{" "}
                {order.shippingAddress?.pincode}
              </p>
            </div>

            {/* Cancel Button */}
            {order.orderStatus === "Pending" && (
              <div className="mt-4 text-right">
                <button
                  disabled={cancellingId === order._id}
                  onClick={() => handleCancel(order._id)}
                  className="text-sm text-red-600 hover:underline disabled:opacity-50"
                >
                  {cancellingId === order._id
                    ? "Cancelling..."
                    : "Cancel Order"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
