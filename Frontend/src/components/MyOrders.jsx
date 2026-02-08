import { useEffect, useState } from "react";
import api from "../api/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/my");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="p-6">You have no orders yet.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                Order #{order._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span className="font-medium">{order.orderStatus}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₹{order.totalAmount}</p>
              <p className="text-sm text-gray-500">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
