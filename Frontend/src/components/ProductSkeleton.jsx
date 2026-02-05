import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductSkeleton() {
  return (
    <div className="w-64 p-4  rounded">
      <Skeleton height={150} />
      <Skeleton height={20} style={{ marginTop: 10 }} />
      <Skeleton height={20} width="60%" />
    </div>
  );
}

export default ProductSkeleton;