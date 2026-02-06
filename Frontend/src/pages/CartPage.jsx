import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { toast } from "react-toastify";

function CartPage() {
  const [cart, setCart] = useState(null);

  const getData = async () => {
    try {
      const res = await api.get('/api/cart');
      setCart(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching cart: ", error);
    }
  }


  useEffect(() => {
    getData();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if(quantity < 1) return;
    try {
      await api.post('/api/cart/update', { productId, quantity });

      getData();
    } catch (error) {
      console.log("Error in updating quantity frontend", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await api.post("/api/cart/remove", { productId });
      console.log(res);
      getData();
      toast.success("Item removed successfully", {autoClose: 1000})
    } catch (error) {
      console.log("Error in removing item", error.message);
      toast.error("Fail to remove item", {autoClose: 1000})
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
          <p className="text-gray-500 mt-2">
            Add some stylish bags to continue
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto py-10 max-w-7xl h-80">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-5">
          <div className="lg:col-span-2 space-y-6">
           {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          <CartSummary items={cart.items} />
        </div>
      </div>
    </>
  )
}

export default CartPage;
