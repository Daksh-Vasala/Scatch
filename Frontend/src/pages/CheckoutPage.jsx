import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Input from "../components/Input";

function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatorSchema = {
    fullName: {
      required: "Name is required",
    },

    phone: {
      required: "Phone is required",
      pattern: {
        value: /^[6-9]\d{9}$/,
        message: "Enter a valid phone number",
      },
    },

    addressLine: {
      required: "Address is required",
      minLength: {
        value: 4,
        message: "Enter valid address",
      },
    },

    city: {
      required: "City is required",
    },

    state: {
      required: "State is required",
    },

    pincode: {
      required: "Pin code is required",
      minLength: {
        value: 6,
        message: "Pin code can't be less than 6",
      },

      maxLength: {
        value: 6,
        message: "Pin code can't be more than 6",
      },
    },
  };

  const [cart, setCart] = useState(null);

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

  const { items } = cart;
  const summary = items.reduce(
    (acc, item) => {
      const price = item.product.price;
      const discount = item.product.discount || 0;
      const quantity = item.quantity;

      const mrp = price * quantity;
      const discountedPrice = Math.round(price - (price * discount) / 100);
      const finalPrice = discountedPrice * quantity;

      acc.totalMrp += mrp;
      acc.payable += finalPrice;
      acc.discount += mrp - finalPrice;

      return acc;
    },
    { totalMrp: 0, payable: 0, discount: 0 },
  );

  const submitHandler = async (data) => {
    console.log(data);

    try {
      const res = await api.post("/api/orders", {
        fullName: data.fullName,
        phone: data.phone,
        addressLine: data.addressLine,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        paymentType: "COD"
      });
      console.log(res);
      toast.success("Order placed successfully");
      navigate('/accounts/orders');
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
        <form
          id="checkout-form"
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            type="text"
            placeholder="Full Name"
            register={register}
            validator={validatorSchema.name}
            name="fullName"
            errors={errors}
          />

          <Input
            type="text"
            placeholder="Phone"
            register={register}
            validator={validatorSchema.phone}
            name="phone"
            errors={errors}
          />

          <Input
            type="text"
            placeholder="Address Line"
            register={register}
            validator={validatorSchema.addressLine}
            name="addressLine"
            errors={errors}
          />

          <Input
            type="text"
            placeholder="City"
            register={register}
            validator={validatorSchema.city}
            name="city"
            errors={errors}
          />

          <Input
            type="text"
            placeholder="State"
            register={register}
            validator={validatorSchema.state}
            name="state"
            errors={errors}
          />

          <Input
            type="text"
            placeholder="Pincode"
            register={register}
            validator={validatorSchema.pincode}
            name="pincode"
            errors={errors}
          />
        </form>

        {/* Items */}
        <div className="shadow-lg rounded-xl p-5 bg-white">
          <h2 className="text-lg font-semibold mb-4">Items</h2>

          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 border-b border-gray-300 pb-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
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
      <div className="shadow-lg rounded-xl p-5 bg-white h-fit">
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
          type="submit"
          form="checkout-form"
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
