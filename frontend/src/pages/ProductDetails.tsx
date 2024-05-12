import { Product } from "../lib/types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { convertDate, API_URL, formatPriceForints } from "@/lib/utils";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import AddToCartButton from "@/components/AddToCartButton";
import ProductList from "@/components/ProductList";
import Loading from "@/components/Loading";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const reviews = {
  average: Math.random() * 5,
  totalCount: Math.floor(Math.random() * 250),
};

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await fetch(API_URL + "/products/" + productId);
      const data: Product = await response.json();
      return data;
    },
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  const { price, name, image, createdAt, category, description } = data || {};
  
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-alternate sm:text-4xl">
              {name}
            </h1>
            <h2 className="flex justify-between mr-4">
              <span>{category}</span>
              {createdAt && <span>{convertDate(createdAt.toString())}</span>}
            </h2>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-foreground sm:text-xl">{formatPriceForints(price)}</p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-muted-foreground">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-muted-foreground">{description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-muted-foreground">
                In stock and ready to ship
              </p>
            </div>
            <div className="sm:flex sm:justify-between"></div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={image}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>
            <div className="mt-4"></div>
            <div className="mt-10">
              <AddToCartButton product={data} />
            </div>
            <div className="mt-6 text-center">
              <a href="#" className="group inline-flex text-base font-medium">
                <ShieldCheckIcon
                  className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="hover:text-foreground/80">
                  Guaranteed quality!
                </span>
              </a>
            </div>
          </section>
        </div>
      </div>
      <ProductList currentProductId={productId!} category={category} />
    </div>
  );
};

export default ProductDetails;
