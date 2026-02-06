import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import Navbar from "../components/Navbar";

function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Dummy data (UI only)
    setCart({
      items: [
        {
          product: {
            _id: "1",
            name: "Urban Rolltop Backpack",
            price: 2799,
            image: "https://picsum.photos/300/300?random=1",
            discount: 10,
          },
          quantity: 1,
        },
        {
          product: {
            _id: "2",
            name: "Premium Office Laptop Bag",
            price: 3899,
            image: "https://picsum.photos/300/300?random=2",
          },
          quantity: 2,
        },
      ],
    });
  }, []);

  const updateQuantity = (productId, quantity) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      ),
    }));
  };

  const removeItem = (productId) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (item) => item.product._id !== productId
      ),
    }));
  };

  if (!cart || cart.items.length === 0) {
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
        <h1 className="text-4xl font-semibold mb-8">Your Cart</h1>
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

  // return (
  //   <>
  //     <Navbar />
  //     <div className="max-w-7xl mx-auto px-4 py-10">
  //       <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  //         {/* Cart Items */}
  //         <div className="lg:col-span-2 space-y-6">
  //           {cart.items.map((item) => (
  //             <CartItem
  //               key={item.product._id}
  //               item={item}
  //               updateQuantity={updateQuantity}
  //               removeItem={removeItem}
  //             />
  //           ))}
  //         </div>

  //         {/* Summary */}
  //         <CartSummary items={cart.items} />
  //       </div>
  //     </div>
  //   </>
  // );
}

export default CartPage;
