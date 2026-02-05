import { useState, useEffect } from 'react';

import ProductCard from './ProductCard.jsx';
import api from '../api/api.js';
import ProductSkeleton from './ProductSkeleton.jsx';

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(true);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-5">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        : products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </div>
  );
}


export default ProductGrid