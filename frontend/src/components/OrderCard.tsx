import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Order, OrderLine } from "@/lib/types";
import { convertDate, formatPriceForints } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const OrderCard: React.FC<{
  orderData: { order: Order; orderLines: OrderLine[] };
}> = ({ orderData }) => {

  if (!orderData) {
    return 
  }

  const { order, orderLines } = orderData;
  return (
    <div className="bg-background border-b border-tshadow-sm sm:rounded-lg sm:border">
      <div className="flex items-center p-4 sm:grid sm:grid-cols-2 w-full sm:gap-x-6 sm:p-6">
        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div>
            <dt className="font-medium">Order number</dt>
            <dd className="mt-1 overflow-auto text-foreground/80">
              {order._id}
            </dd>
          </div>
          <div className="">
            <dt className="font-medium">Date placed</dt>
            <dd className="mt-1 text-foreground/80 ">
              <time dateTime={order.createdAt}>
                {convertDate(order.createdAt)}
              </time>
            </dd>
          </div>
          <div>
            <dt className="font-medium">Total amount</dt>
            <dd className="mt-1 font-medium text-foreground/80">
              {formatPriceForints(order.total)}
            </dd>
          </div>
        </dl>
      </div>
      <Separator />

      {/* Products */}
      <h4 className="sr-only">Items</h4>
      <ul role="list" className="">
        {orderLines.map(({ product_id: product, quantity }, index) => (
          <React.Fragment key={index}>
            <li className="p-4 sm:p-6">
              <div className="flex items-center sm:items-start">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg  sm:h-40 sm:w-40">
                  <img
                    src={product.image}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-6 flex-1 text-sm">
                  <div className="font-medium sm:flex sm:justify-between">
                    <h5>
                      {product.name}
                      <span className="font-bold "> x {quantity}</span>
                    </h5>
                    <p className="mt-2 sm:mt-0">
                      {formatPriceForints(product.price)}
                    </p>
                  </div>
                  <p className="hidden text-alternate font-semibold sm:mt-2 sm:block">
                    {product.category}
                  </p>
                  <p className="hidden sm:mt-2 sm:block">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:flex sm:justify-between">
                <div className="flex items-center">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-2 text-sm font-medium">
                    Delivered on{" "}
                    <time dateTime={order.createdAt}>
                      {convertDate(order.createdAt)}
                    </time>
                  </p>
                </div>

                <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                  <div className="flex flex-1 justify-center">
                    <Button asChild>
                      <Link
                        to={`/products/${product._id}`}
                        className="whitespace-nowrap"
                      >
                        View product
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </li>
            <Separator />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
