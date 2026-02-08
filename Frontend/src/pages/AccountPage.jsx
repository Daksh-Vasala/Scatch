import { Link } from "react-router-dom";

function AccountPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>

      <div className="space-y-4">
        {/* My Orders */}
        <Link
          to="/account/orders"
          className="block border rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h2 className="text-lg font-medium">My Orders</h2>
          <p className="text-sm text-gray-500">
            View your order history and order status
          </p>
        </Link>

        {/* Logout (optional here if already in navbar) */}
        <div className="border rounded-lg p-4 text-red-600 cursor-pointer hover:bg-red-50 transition">
          Logout
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
