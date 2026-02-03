const products = [
  {
    name: "Urban Rolltop Backpack",
    price: 2799,
    image: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=1529&fit=crop",
    description: "Modern rolltop backpack for city travel.",
    discount: 10,
    stock: 12,
    bgColor: "#f5f5f5",
    panelColor: "#ffffff",
    textColor: "#1a1a1a"
  },
  {
    name: "Classic Leather Backpack",
    price: 4599,
    image: "https://images.unsplash.com/photo-1574365569389-a10d488ca3fb?q=80&w=1170&fit=crop",
    description: "Premium leather backpack for professionals.",
    discount: 15,
    stock: 6,
    bgColor: "#fff3e0",
    panelColor: "#ffffff",
    textColor: "#4e342e"
  },
  {
    name: "Minimal Everyday Backpack",
    price: 2399,
    image: "https://images.unsplash.com/photo-1525103504173-8dc1582c7430?q=80&w=1174&fit=crop",
    description: "Minimal design for daily essentials.",
    discount: 0,
    stock: 18,
    bgColor: "#eef2f3",
    panelColor: "#ffffff",
    textColor: "#263238"
  },
  {
    name: "Premium Office Laptop Bag",
    price: 3899,
    image: "https://images.unsplash.com/photo-1647426112650-6c96ce7ab5f0?q=80&w=1105&fit=crop",
    description: "Stylish laptop bag for office use.",
    discount: 12,
    stock: 9,
    bgColor: "#e3f2fd",
    panelColor: "#ffffff",
    textColor: "#0d47a1"
  },
  {
    name: "Luxury Travel Backpack",
    price: 4999,
    image: "https://plus.unsplash.com/premium_photo-1671028547420-a541b5a1243e?q=80&w=1170&fit=crop",
    description: "Luxury backpack with premium materials.",
    discount: 20,
    stock: 5,
    bgColor: "#e8f5e9",
    panelColor: "#ffffff",
    textColor: "#1b5e20"
  },
  {
    name: "Vintage Canvas Backpack",
    price: 2699,
    image: "https://images.unsplash.com/photo-1448582649076-3981753123b5?q=80&w=1170&fit=crop",
    description: "Vintage-style canvas backpack.",
    discount: 8,
    stock: 14,
    bgColor: "#ede7f6",
    panelColor: "#ffffff",
    textColor: "#311b92"
  },
  {
    name: "Casual Daypack",
    price: 1899,
    image: "https://images.unsplash.com/photo-1620786514684-ff35b5aae55e?q=80&w=971&fit=crop",
    description: "Lightweight backpack for daily use.",
    discount: 0,
    stock: 22,
    bgColor: "#f1f8e9",
    panelColor: "#ffffff",
    textColor: "#33691e"
  },
  {
    name: "Compact Travel Backpack",
    price: 2199,
    image: "https://images.unsplash.com/photo-1657603719375-8ffdacaac790?q=80&w=1170&fit=crop",
    description: "Compact backpack ideal for short trips.",
    discount: 5,
    stock: 16,
    bgColor: "#fffde7",
    panelColor: "#ffffff",
    textColor: "#f57f17"
  },
  {
    name: "Multi-Purpose Utility Backpack",
    price: 2599,
    image: "https://images.unsplash.com/photo-1528921581519-52b9d779df2b?q=80&w=988&fit=crop",
    description: "Versatile backpack for work and travel.",
    discount: 10,
    stock: 13,
    bgColor: "#fafafa",
    panelColor: "#ffffff",
    textColor: "#212121"
  },
  {
    name: "Modern Street Backpack",
    price: 2999,
    image: "https://images.unsplash.com/photo-1711548244653-72219aa9ac27?q=80&w=1173&fit=crop",
    description: "Street-style backpack with modern look.",
    discount: 12,
    stock: 11,
    bgColor: "#fce4ec",
    panelColor: "#ffffff",
    textColor: "#880e4f"
  },
  {
    name: "Waterproof Adventure Backpack",
    price: 3499,
    image: "https://images.unsplash.com/photo-1667411424594-403300e5cc35?q=80&w=1170&fit=crop",
    description: "Water-resistant backpack for outdoor use.",
    discount: 18,
    stock: 8,
    bgColor: "#e0f2f1",
    panelColor: "#ffffff",
    textColor: "#004d40"
  },
  {
    name: "Structured Office Backpack",
    price: 3199,
    image: "https://images.unsplash.com/photo-1667411424779-f1da9251c39b?q=80&w=1170&fit=crop",
    description: "Structured design for office professionals.",
    discount: 10,
    stock: 10,
    bgColor: "#eceff1",
    panelColor: "#ffffff",
    textColor: "#263238"
  },
  {
    name: "Classic Brown Travel Bag",
    price: 4299,
    image: "https://images.unsplash.com/photo-1568247067952-eab2ce84a349?q=80&w=1170&fit=crop",
    description: "Classic travel bag with timeless design.",
    discount: 15,
    stock: 7,
    bgColor: "#efebe9",
    panelColor: "#ffffff",
    textColor: "#3e2723"
  },
  {
    name: "Minimal Carry-On Backpack",
    price: 2499,
    image: "https://images.unsplash.com/photo-1603920347917-d16487c88db4?q=80&w=1170&fit=crop",
    description: "Minimal backpack perfect for carry-on travel.",
    discount: 0,
    stock: 20,
    bgColor: "#f3f4f6",
    panelColor: "#ffffff",
    textColor: "#111827"
  }
];

const bagImages = [
  "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=1529&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1574365569389-a10d488ca3fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1525103504173-8dc1582c7430?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1647426112650-6c96ce7ab5f0?q=80&w=1105&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1671028547420-a541b5a1243e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1448582649076-3981753123b5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1620786514684-ff35b5aae55e?q=80&w=971&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1657603719375-8ffdacaac790?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1528921581519-52b9d779df2b?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1711548244653-72219aa9ac27?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1667411424594-403300e5cc35?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1667411424779-f1da9251c39b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1568247067952-eab2ce84a349?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1603920347917-d16487c88db4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export default products;
