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
          <img
            src={image}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mt-4">
          <Link to={`/products/${_id}`}>
            <h3 className="text-sm font-medium text-foreground hover:underline">
              {name}
            </h3>
          </Link>
          <div className="flex justify-between">
            <span className="mt-1 text-sm text-gray-500">{category} </span>
            <span> {convertDate(createdAt)}</span>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">{formatPriceForints(price)}</p>
        </div>
      </div>
      <div className="mt-6">
        <AddToCartButton product={product}/>
      </div>
    </div>
  );
};

export default ProductCard;
