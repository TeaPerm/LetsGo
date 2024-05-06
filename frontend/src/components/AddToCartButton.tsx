import React from "react";
import { Button } from "./ui/button";
import { Product } from "@/lib/types";
import { useShoppingCart } from "@/hooks/useShoppingCart";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addProductToCart } = useShoppingCart();

  function handleAddToCart() {
    // Retrieve existing cart products from localStorage
    addProductToCart(product);
  }

  return (
    <Button className="w-full h-12 font-bold" onClick={handleAddToCart}>
      Add to bag
    </Button>
  );
};

export default AddToCartButton;
