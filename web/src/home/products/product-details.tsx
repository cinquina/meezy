import {
  Button,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { ProductDots } from "./product-dots";
import { ProductGallery } from "./product-gallery";
import { ProductSummary } from "./product-summary";
import { SizeSelector } from "./sizeselector";
import type { Product } from "./types";

export function ProductDetails({
  product,
  sameNameProducts,
  onClose,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: {
  product: Product;
  sameNameProducts: Product[];
  onClose: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(false);
  return (
    <Transition show>
      <Dialog onClose={onClose} className="relative z-40">
        <TransitionChild>
          <div className="fixed inset-0 bg-white transition duration-300 data-[closed]:opacity-0" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <TransitionChild>
            <DialogPanel className="flex min-h-full flex-col bg-white transition duration-500 data-[closed]:translate-y-8 data-[closed]:opacity-0">
              <div className="p-4">
                <Button
                  type="button"
                  onClick={onClose}
                  aria-label="Back to products"
                  className="cursor-pointer"
                >
                  <FiArrowLeft size={24} />
                </Button>
              </div>
              <div className="flex flex-1 flex-col items-center gap-4 p-4">
                <ProductGallery
                  product={product}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  onPrevious={onPrevious}
                  onNext={onNext}
                />
                <div className="relative min-h-56 w-full max-w-3xl pb-12">
                  <ProductDots
                    products={sameNameProducts}
                    selectedId={product.id}
                  />
                  <div
                    className={`absolute inset-x-0 top-8 flex flex-col items-center transition-[opacity,transform] duration-300 ${isSizeSelectorOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
                    aria-hidden={!isSizeSelectorOpen}
                  >
                    <SizeSelector
                      product={product}
                      onClose={() => setIsSizeSelectorOpen(false)}
                    />
                  </div>
                  <ProductSummary
                    product={product}
                    isSizeSelectorOpen={isSizeSelectorOpen}
                    onOpenSizeSelector={() => setIsSizeSelectorOpen(true)}
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
