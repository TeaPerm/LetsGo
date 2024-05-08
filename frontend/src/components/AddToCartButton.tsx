import React from "react";
import { Button } from "./ui/button";
import { Product } from "@/lib/types";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useUser } from "@/hooks/useUser";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addProductToCart } = useShoppingCart();
  const user = useUser();

  if (!user) {
    return (
      <div className="flex items-center">
        <Button className="w-full h-12 font-bold" asChild>
          <Link to="/login">
          Log in
          <LogIn className="ml-2 mt-1 w-4 h-4" />
          </Link>
        </Button>
      </div>
    );
  }

  function handleAddToCart() {
    addProductToCart(product);
  }

  return (
    <Button className="w-full h-12 font-bold" onClick={handleAddToCart}>
      Add to bag
    </Button>
  );
};

export default AddToCartButton;
