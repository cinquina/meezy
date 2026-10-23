function ProductCard({ productName, productId }: { productName: string; productId: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
      <h3 className="text-base font-regular">{productName}</h3>
    </div>
  )
}
export function Products() {
  return (
    <div className="grid h-full grid-cols-5 items-center justify-center p-4">
      <ProductCard productName="Product 1" productId="1" />
      <ProductCard productName="Product 2" productId="2" />
      <ProductCard productName="Product 3" productId="3" />
      <ProductCard productName="Product 4" productId="4" />
      <ProductCard productName="Product 5" productId="5" />
    </div>
  );
}
