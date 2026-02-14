import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await api.get("/api/admin/stats");
  //       setStats(res.data);
  //     } catch (error) {
  //       toast.error("Not authorized");
  //       navigate("/");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStats();
  // }, [navigate]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-500 text-sm">Total Revenue</h2>
          <p className="text-2xl font-semibold mt-2">
            ₹ {stats.totalRevenue}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-2xl font-semibold mt-2">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-semibold mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-500 text-sm">Total Products</h2>
          <p className="text-2xl font-semibold mt-2">
            {stats.totalProducts}
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
