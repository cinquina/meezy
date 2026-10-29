import { create } from "zustand";
import type { Product } from "../home/products/types";

export type ProductInCart = Product & {
  quantity: number;
  size: string;
};

export type CartStore = {
  productsInCart: ProductInCart[];
  setCartProducts: (products: ProductInCart[]) => void;
  addProductToCart: (product: ProductInCart) => void;
  addQuantityToProductInCart: (productId: string, quantity: number, size: string) => void;
  removeProductFromCart: (productId: string, size: string) => void;
  removeQuantityFromProductInCart: (productId: string, quantity: number, size: string) => void;
};

function readCart(): ProductInCart[] {
  try {
    const storedCart: unknown = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const products = Array.isArray(storedCart) ? storedCart : [storedCart];
    return products.filter((product): product is ProductInCart =>
      product !== null && typeof product === "object" &&
      typeof product.id === "string" && typeof product.name === "string" &&
      typeof product.image === "string" && typeof product.size === "string" &&
      typeof product.price === "number" && Number.isFinite(product.price) &&
      Number.isInteger(product.quantity) && product.quantity > 0
    );
  } catch {
    return [];
  }
}

const useCartStore = create<CartStore>((set) => ({
  productsInCart: readCart(),
  setCartProducts: (products) => set({ productsInCart: products }),
  addProductToCart: (product) =>
    set((state) => ({
      productsInCart: state.productsInCart.some((p) => p.id === product.id && p.size === product.size)
        ? state.productsInCart.map((p) =>
            p.id === product.id && p.size === product.size
              ? { ...p, quantity: p.quantity + product.quantity }
              : p
          )
        : [...state.productsInCart, product],
    })),
  addQuantityToProductInCart: (productId, quantity, size) =>
    set((state) => ({
      productsInCart: state.productsInCart.map((p) =>
        p.id === productId && p.size === size ? { ...p, quantity: p.quantity + quantity } : p
      ),
    })),
  removeProductFromCart: (productId, size) =>
    set((state) => ({
      productsInCart: state.productsInCart.filter((p) => p.id !== productId || p.size !== size),
    })),
  removeQuantityFromProductInCart: (productId, quantity, size) =>
    set((state) => ({
      productsInCart: state.productsInCart.map((p) =>
        p.id === productId && p.size === size ? { ...p, quantity: p.quantity - quantity } : p
      ).filter((p) => p.quantity > 0),
    })),
}));

useCartStore.subscribe((state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.productsInCart));
  } catch {
    // keep the in-memory cart usable when browser storage is unavailable.
  }
});

export default useCartStore;
