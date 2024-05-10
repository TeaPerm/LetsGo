import { Product } from "@/lib/types";
import { create } from "zustand";

interface ShoppingCartState {
  cartProducts: Product[];
  isOpen: boolean;
  addProductToCart: (product: Product, quantity?: number) => void;
  setQuantity: (productId: Product["_id"], quantity: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  removeProductFromCart: (productId: Product["_id"]) => void;
  clearCart: () => void;
}

export const useShoppingCart = create<ShoppingCartState>((set) => ({
  cartProducts: JSON.parse(localStorage.getItem("cartProducts") || "[]"),
  isOpen: false,

  addProductToCart: (product, quantity = 1) => {
    set((state) => {
      // Check if the product is already in the cart
      const existingProductIndex = state.cartProducts.findIndex(
        (p) => p._id === product._id
      );

      if (existingProductIndex !== -1) {
        // If product already exists, update its quantity
        const updatedCartProducts = state.cartProducts.map((p, index) => {
          if (index === existingProductIndex) {
            return { ...p, quantity: p.quantity! + quantity };
          }
          return p;
        });

        // Update localStorage with the updated cart products
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(updatedCartProducts)
        );

        // Return the updated state
        return { ...state, cartProducts: updatedCartProducts };
      } else {
        // If product doesn't exist in the cart, add it
        const updatedCartProducts = [
          ...state.cartProducts,
          { ...product, quantity },
        ];

        // Update localStorage with the updated cart products
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(updatedCartProducts)
        );

        // Return the updated state
        return { ...state, cartProducts: updatedCartProducts };
      }
    });
  },

  setQuantity: (productId, quantity) => {
    set((state) => {
      const updatedCartProducts = state.cartProducts.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity };
        }
        return product;
      });

      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));

      return { ...state, cartProducts: updatedCartProducts };
    });
  },

  setIsOpen: (isOpen) => {
    set((state) => {
      return { ...state, isOpen: isOpen };
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
  },
}));
