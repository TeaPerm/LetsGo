import { ProductsResponse } from "@/lib/types";
import { API_URL, formatPriceForints } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function ProductList({
  category,
  currentProductId,
}: {
  category: string;
  currentProductId: string;
}) {
  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: [],
    queryFn: async () => {
      const options = `?category=${category}`;
      const response = await fetch(API_URL + "/products" + options);
      const data = await response.json();
      return data;
    },
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  const { products } = data;

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Products with the same category: {category}
          </h2>
          <Link
            to={`/products/?category=${category}`}
            className="hidden text-sm font-medium md:block hover:text-foreground/80"
          >
            Shop the category
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.slice(0, 4).map(
            (product) =>
              product._id !== currentProductId && (
                <div key={product._id} className="group relative">
                  <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-4 text-sm">
                    <Link to={`/products/${product._id}`}>
                      <span className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-foreground/70">
                    {product.category}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {formatPriceForints(product.price)}
                  </p>
                </div>
              )
          )}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Shop the category
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
