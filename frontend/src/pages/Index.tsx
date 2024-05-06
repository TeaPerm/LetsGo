import { API_URL } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import { ProductSkeleton } from "@/components/ProductSkeleton";

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(API_URL + "/products");
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="mt-8 mb-12 mx-4 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
      <div className="mt-8 mb-12 mx-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {data.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
  );
};

export default Index;
