import { Button } from "@headlessui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Product } from "./types";

export function ProductGallery({
  product,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: {
  product: Product;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex h-[min(60vh,32rem)] flex-none items-center justify-center gap-8 px-4">
      {hasPrevious ? (
        <Button type="button" onClick={onPrevious} aria-label="Previous product" className="cursor-pointer">
          <FiChevronLeft size={28} />
        </Button>
      ) : <span className="w-7" aria-hidden="true" />}
      <img src={product.image} alt={product.name} className="h-64 w-64 rounded-full " />
      {hasNext ? (
        <Button type="button" onClick={onNext} aria-label="Next product" className="cursor-pointer">
          <FiChevronRight size={28} />
        </Button>
      ) : <span className="w-7" aria-hidden="true" />}
    </div>
  );
}
