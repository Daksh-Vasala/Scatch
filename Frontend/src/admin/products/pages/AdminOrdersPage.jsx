import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

function AdminOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Temporary mock data (replace with API later)
  // const orders = [
  //   {
  //     _id: "ORD12345",
  //     user: { name: "John Doe", email: "john@example.com" },
  //     totalAmount: 4599,
  //     status: "processing",
  //     paymentStatus: "paid",
  //     createdAt: "2026-02-19",
  //   },
  //   {
  //     _id: "ORD12346",
  //     user: { name: "Jane Smith", email: "jane@example.com" },
  //     totalAmount: 2799,
  //     status: "pending",
  //     paymentStatus: "pending",
  //     createdAt: "2026-02-18",
  //   },
  // ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/admin/orders");
        console.log(res);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-4 text-sm font-medium">Order ID</th>
              <th className="p-4 text-sm font-medium">Customer</th>
              <th className="p-4 text-sm font-medium">Total</th>
              <th className="p-4 text-sm font-medium">Status</th>
              <th className="p-4 text-sm font-medium">Payment</th>
              <th className="p-4 text-sm font-medium">Date</th>
              <th className="p-4 text-sm font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{order._id}</td>

                <td className="p-4">
                  <div className="font-medium">{order.user.name}</div>
                  <div className="text-sm text-gray-500">
                    {order.user.email}
                  </div>
                </td>

                <td className="p-4">₹{order.totalAmount}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td className="p-4 capitalize">
                  {order.paymentStatus}
                </td>

                <td className="p-4 text-sm text-gray-600">
                  {order.createdAt}
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/orders/${order._id}`)
                    }
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrdersPage;
