import type { Product } from "./types";

export function ProductDots({ products, selectedId }: { products: Product[]; selectedId: string }) {
  return (
    <div className="flex justify-center gap-2" aria-label="Product position">
      {products.map((product) => (
        <span key={product.id} className={`h-1.5 w-1.5 rounded-full ${product.id === selectedId ? "bg-black" : "bg-black/20"}`} />
      ))}
    </div>
  );
}
