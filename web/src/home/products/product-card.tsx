import type { Product } from "./types";

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (productId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      className="flex cursor-pointer flex-col items-center justify-center p-4 transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <div className="mb-4 h-24 w-24 rounded-full bg-gray-200" />
      <h3 className="text-base font-regular">{product.name}</h3>
    </button>
  );
}
