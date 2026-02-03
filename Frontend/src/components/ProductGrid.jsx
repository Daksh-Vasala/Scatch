import { useState, useEffect } from 'react';

import ProductCard from './ProductCard.jsx';
import api from '../api/api.js';

function ProductGrid() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get('/api/products');
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    getData();
  }, []);
  return (
    <div className="flex flex-wrap gap-4 p-5">
      {products.map((elem, idx) => (
        <ProductCard key={idx} product={elem}/>
      ))}
    </div>
  )
}

export default ProductGrid