import { ProductCard } from "./product-card";
import { ProductDetails } from "./product-details";
import { products } from "./data";

export type ProductsProps = { selectedProduct: string | null; onProductSelect: (productId: string) => void; onClose: () => void };

export function Products({ selectedProduct, onProductSelect, onClose }: ProductsProps) {
  const selected = products.find((product) => product.id === selectedProduct) ?? null;
  const sameNameProducts = selected ? products.filter((product) => product.name === selected.name) : [];
  const selectedIndex = selected ? sameNameProducts.findIndex((product) => product.id === selected.id) : -1;
  return (
    <>
      <div className="grid h-full grid-cols-2 items-center justify-center p-4 sm:grid-cols-5">
        {products.map((product) => <ProductCard key={product.id} product={product} onSelect={onProductSelect} />)}
      </div>
      {selected && <ProductDetails product={selected} sameNameProducts={sameNameProducts} onClose={onClose} hasPrevious={selectedIndex > 0} hasNext={selectedIndex < sameNameProducts.length - 1} onPrevious={() => selectedIndex > 0 && onProductSelect(sameNameProducts[selectedIndex - 1].id)} onNext={() => selectedIndex < sameNameProducts.length - 1 && onProductSelect(sameNameProducts[selectedIndex + 1].id)} />}
    </>
  );
}
