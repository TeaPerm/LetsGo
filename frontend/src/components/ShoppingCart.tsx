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
