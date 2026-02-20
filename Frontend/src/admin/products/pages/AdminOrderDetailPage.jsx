import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api";

function AdminOrderDetailPage() {
  const { id } = useParams(); // get order id from URL
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/orders/${id}`);
        console.log(res.data);
        setOrder(res.data);
        setStatus(res.data.orderStatus); // set status after data loads
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!order) {
    return <div className="p-8">Loading...</div>;
  }

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/api/admin/orders/update/${id}`, {status});
      navigate("/admin/orders");
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  const totalAmount =
    order.items?.reduce(
      (acc, item) => acc + item.priceAtAddTime * item.quantity,
      0
    ) || 0;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-gray-500">Order ID: {order._id}</p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            order.paymentStatus === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {order.paymentStatus}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer */}
        <div className="bg-white shadow rounded-xl p-6 space-y-2">
          <h2 className="text-lg font-semibold">Customer Info</h2>
          <p>
            <span className="font-medium">Name:</span>{" "}
            {order.shippingAddress?.fullName}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {order.shippingAddress?.phone}
          </p>
          <p>
            <span className="font-medium">Order Date:</span>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Shipping */}
        <div className="bg-white shadow rounded-xl p-6 space-y-2">
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <p>{order.shippingAddress?.addressLine}</p>
          <p>
            {order.shippingAddress?.city},{" "}
            {order.shippingAddress?.postalCode}
          </p>
          <p>{order.shippingAddress?.state}</p>
        </div>

        {/* Status */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Order Status</h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button className="w-full bg-black text-white py-2 rounded-md hover:opacity-90"
          onClick={handleUpdate}>
            Update Status
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Ordered Items</h2>

        <div className="space-y-4">
          {order.items?.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.priceAtAddTime} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{(item.priceAtAddTime * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <div className="text-right">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-2xl font-bold">
              ₹{totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetailPage;
