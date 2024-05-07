import React from "react";
import { Product } from "@/lib/types";
import { convertDate, formatPriceForints } from "@/lib/utils";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { price, name, image, category, createdAt, _id } = product;
  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <Link to={`/products/${_id}`}>
          <img
            src={image}
            className="h-full transition-all duration-300 hover:scale-95 w-full object-contain object-center"
            />
            </Link>
        </div>
        <div className="relative mt-4">
          <Link to={`/products/${_id}`}>
            <h3 className="text-sm font-medium text-foreground hover:underline">
              {name}
            </h3>
          </Link>
          <div className="flex justify-between">
            <span className="mt-1 text-sm text-gray-500">{category} </span>
            <p className="relative text-lg font-semibold text-white">{formatPriceForints(price)}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <AddToCartButton product={product}/>
      </div>
    </div>
  );
};

export default ProductCard;
