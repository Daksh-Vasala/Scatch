import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Navbar from '../components/Navbar.jsx'
import { useState, useEffect } from "react";
import api from "../api/api.js";
import { toast } from 'react-toastify';


function HomePage() {
  const [filters, setFilters] = useState({
    collection: "all",
    inStock: false,
    discount: null,
    sort: "newest",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("/api/products", {
          params: filters,
        });
        console.log(res);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [filters]);
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Sidebar setFilters={setFilters} />
        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  )
}

export default HomePage