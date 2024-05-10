// import { Fragment, useState } from "react";
// import { Popover, Transition } from "@headlessui/react";
// import { ToyBrick } from "lucide-react";
// import { Button } from "./ui/button";
// import { Product } from "@/lib/types";
// import { API_URL, formatPriceForints } from "@/lib/utils";
// import { useMutation } from "@tanstack/react-query";
// import { useShoppingCart } from "@/hooks/useShoppingCart";
// import { LoadableButton } from "./LoadableButton";

// const ShoppingCart = () => {
//   const { removeProductFromCart, cartProducts } = useShoppingCart();
//   const [isLoading, setIsLoading] = useState(false);

//   const proceedCheckout = useMutation({
//     mutationFn: async (cartProducts: Product[]) => {
//       setIsLoading(true);
//       const requestData = cartProducts.map(({ _id }) => ({
//         product_id: _id,
//         quantity: 1,
//       }));
//       const token = localStorage.getItem("accesToken");
//       const response: Response = await fetch(`${API_URL}/orders/checkout`, {
//         method: "POST",
//         headers: {
//           Authorization: token ? `Bearer ${token}` : "",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       });

//       const responseData = await response.json();
//       console.log(JSON.stringify(requestData));
//       return responseData;
//     },
//     onSuccess: (data) => {
//       console.log(data.url);
//       window.location.href = data.url;
//     },
//   });

//   return (
//     <Popover className="flow-root text-sm lg:relative">
//       <Popover.Button>
//         <Button variant="outline" className="w-12" size="icon" asChild>
//           <div>
//             <ToyBrick className="h-6 w-6 flex-shrink-0 " aria-hidden="true" />
//             <span className="ml-0.5 text-sm font-medium">
//               ({cartProducts.length})
//             </span>
//           </div>
//         </Button>
//       </Popover.Button>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-200"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="transition ease-in duration-150"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-muted pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
//           <h2 className="sr-only">Shopping Cart</h2>

//           <div className="divide-y">
//             {cartProducts.length === 0 ? (
//               <div>Empty Cart</div>
//             ) : (
//               cartProducts.map((product) => (
//                 <div key={product._id} className="flex items-center py-6">
//                   <img
//                     src={product.image}
//                     className="h-16 w-16 flex-none rounded-md"
//                     alt={product.name} // Don't forget alt attribute for accessibility
//                   />
//                   <div className="ml-4">
//                     <h3 className="font-medium">
//                       <a /* href={product.href} */>{product.name}</a>
//                     </h3>
//                     <div className="flex justify-between">
//                       <p className="text-primary">{product.category}</p>
//                       <p className="text-primary">
//                         {formatPriceForints(product.price)}
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     className="text-alternate hover:text-alternate/60"
//                     onClick={() => removeProductFromCart(product._id)}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))
//             )}
//           </div>

//           {cartProducts.length !== 0 && (
//             <>
//               <LoadableButton
//                 loading={isLoading}
//                 type="submit"
//                 className="w-full"
//                 onClick={() => proceedCheckout.mutate(cartProducts)}
//               >
//                 Checkout
//               </LoadableButton>

//               <p className="mt-6 text-center">
//                 <a
//                   href="#"
//                   className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   View Shopping Bag
//                 </a>
//               </p>
//             </>
//           )}
//         </Popover.Panel>
//       </Transition>
//     </Popover>
//   );
// };

// export default ShoppingCart;

import { ToyBrick } from "lucide-react";
import { Button } from "./ui/button";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import ProductCartDialog from "./ProductCartDialog";

const ShoppingCart = () => {

  const {setIsOpen, cartProducts} = useShoppingCart()

  return (
    <div>
      <Button variant="outline" className="w-12 cursor-pointer" size="icon" onClick={() => setIsOpen(true)} asChild>
        <div>
          <ToyBrick className="h-6 w-6 flex-shrink-0 " aria-hidden="true" />
          <span className="ml-0.5 text-sm font-medium">
            ({cartProducts.length})
          </span>
        </div>
      </Button>
      <ProductCartDialog />
    </div>
  );
};

export default ShoppingCart;
