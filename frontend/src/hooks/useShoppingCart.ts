import { Product } from "@/lib/types";
import { create } from "zustand";

interface ShoppingCartState {
  cartProducts: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: Product["_id"]) => void;
  clearCart: () => void
}

export const useShoppingCart = create<ShoppingCartState>((set) => ({
  cartProducts: JSON.parse(localStorage.getItem("cartProducts") || "[]"),

  addProductToCart: (product) => {
    set((state) => {
      // Calculate the updated cart products
      const updatedCartProducts: Product[] = [...state.cartProducts, product];

      // Update localStorage with the updated cart products
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));

      // Return the updated state
      return { ...state, cartProducts: updatedCartProducts };
    });
  },

  removeProductFromCart: (productId) => {
    set((state) => {
      const updatedCartProducts: Product[] = state.cartProducts.filter(
        (product) => product._id !== productId
      );
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      return { ...state, cartProducts: updatedCartProducts };
    });
  },

  clearCart: () => {
    set((state) => {
      // Clear cart products in state
      const updatedCartProducts: Product[] = [];
      
      // Clear cart products in localStorage
      localStorage.removeItem("cartProducts");

      // Return the updated state with empty cart
      return { ...state, cartProducts: updatedCartProducts };
    });
  }
}));
