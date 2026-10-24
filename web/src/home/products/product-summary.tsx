import { Button } from "@headlessui/react";
import { FiPlus } from "react-icons/fi";
import type { Product } from "./types";

export function ProductSummary({
  product,
  isSizeSelectorOpen,
  onOpenSizeSelector,
}: {
  product: Product;
  isSizeSelectorOpen: boolean;
  onOpenSizeSelector: () => void;
}) {
  return (
    <div className={`absolute inset-x-0 top-8 flex flex-col items-center transition-[opacity,transform] duration-300 ease-out ${isSizeSelectorOpen ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`} aria-hidden={isSizeSelectorOpen}>
      <h1 className="text-base font-medium">{product.name}</h1>
      <p className="mt-4 text-base font-medium">{product.price}</p>
      <Button type="button" onClick={onOpenSizeSelector} aria-label={`Add ${product.name} to cart`} className="mt-4 cursor-pointer">
        <FiPlus size={28} />
      </Button>
    </div>
  );
}
