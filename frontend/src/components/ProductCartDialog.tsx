import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Product } from "@/lib/types";
import { API_URL, calculateCartTotal, formatPriceForints } from "@/lib/utils";
import { LoadableButton } from "./LoadableButton";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function ProductCartDialog() {
  const {
    setIsOpen,
    isOpen,
    cartProducts,
    removeProductFromCart,
    setQuantity,
  } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);

  const proceedCheckout = useMutation({
    mutationFn: async (cartProducts: Product[]) => {
      setIsLoading(true);
      const requestData = cartProducts.map(({ _id, quantity }) => ({
        product_id: _id,
        quantity,
      }));
      const token = localStorage.getItem("accesToken");
      const response: Response = await fetch(`${API_URL}/orders/checkout`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      console.log(JSON.stringify(requestData));
      return responseData;
    },
    onSuccess: (data) => {
      console.log(data);
      console.log(data.url);
      window.location.href = data.url;
    },
  });

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-105"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-105"
            >
              <Dialog.Panel className="flex w-full max-w-3xl transform text-left text-base transition sm:my-8">
                <form className="relative flex w-full flex-col overflow-hidden bg-background pb-8 pt-6 sm:rounded-lg sm:pb-6 lg:py-8">
                  <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg font-medium">Shopping Cart</h2>
                    <button
                      type="button"
                      className="hover:text-foreground/80"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <section aria-labelledby="cart-heading">
                    <h2 id="cart-heading" className="sr-only">
                      Items in your shopping cart
                    </h2>

                    <ul
                      role="list"
                      className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8"
                    >
                      {cartProducts.length == 0 && (
                        <div className="flex items-center justify-center my-12">
                          Your cart is empty add products to checkout!
                          <Button
                            variant="link"
                            onClick={() => setIsOpen(false)}
                            asChild
                          >
                            <Link to="/products">Start shopping</Link>
                          </Button>
                        </div>
                      )}
                      {cartProducts.map((product) => (
                        <li
                          key={product._id}
                          className="flex py-8 text-sm sm:items-center"
                        >
                          <img
                            src={product.image}
                            className="h-24 w-24 flex-none rounded-lg  sm:h-32 sm:w-32"
                          />
                          <div className="ml-4 grid flex-auto grid-cols-1 grid-rows-1 items-start gap-x-5 gap-y-3 sm:ml-6 sm:flex sm:items-center sm:gap-0">
                            <div className="row-end-1 flex-auto sm:pr-6">
                              <h3 className="font-medium ">
                                <a href="">{product.name}</a>
                              </h3>
                              <p className="mt-1 text-foreground/80">
                                {product.category}
                              </p>
                              <p className="mt-1 text-foreground/50">
                                {formatPriceForints(product.price)} / each
                              </p>
                            </div>
                            <p className="row-span-2 row-end-2 font-medium sm:order-1 sm:ml-6 sm:w-1/3 sm:flex-none sm:text-right">
                              {formatPriceForints(
                                product.price * product.quantity!
                              )}
                            </p>
                            <div className="flex items-center sm:block sm:flex-none sm:text-center">
                              <Select
                                defaultValue={product.quantity?.toString()}
                                onValueChange={(value) =>
                                  setQuantity(product._id, parseInt(value))
                                }
                              >
                                <SelectTrigger className="w-[80px]">
                                  <SelectValue placeholder="Quantity" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Quantity</SelectLabel>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>

                              <Button
                                variant="link"
                                type="button"
                                onClick={() =>
                                  removeProductFromCart(product._id)
                                }
                                className="ml-4 pr-4 font-medium sm:ml-0 sm:mt-2"
                              >
                                <span className="text-alternate hover:text-alternate/80">
                                  Remove
                                </span>
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section
                    aria-labelledby="summary-heading"
                    className="mt-auto sm:px-6 lg:px-8"
                  >
                    <div className="p-6 sm:rounded-lg sm:p-8">
                      <h2 id="summary-heading" className="sr-only">
                        Order summary
                      </h2>

                      <div className="flow-root">
                        <dl className="-my-4 divide-y divide-gray-200 text-sm">
                          <div>
                            <dt />
                          </div>
                          <div className="flex items-center justify-between py-4">
                            <dt className="text-base font-medium">
                              Order total
                            </dt>
                            <dd className="text-base font-medium">
                              {calculateCartTotal(cartProducts)}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </section>

                  {cartProducts.length > 0 && (
                    <div className="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
                      <LoadableButton
                        loading={isLoading}
                        className=""
                        onClick={() => proceedCheckout.mutate(cartProducts)}
                      >
                        Continue to payment with{" "}
                        <span className="font-bold bg-gradient-to-r from-blue-400 via-blue-800 to-orange-700 inline-block text-transparent bg-clip-text">
                          Stripe
                        </span>
                      </LoadableButton>
                    </div>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
