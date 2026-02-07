import ProductCard from "./ProductCard.jsx";
import ProductSkeleton from "./ProductSkeleton.jsx";

function ProductGrid({ products, loading }) {
  

  return (
    <div className="flex flex-wrap gap-4 p-5">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        : products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </div>
  );
}

export default ProductGrid;
