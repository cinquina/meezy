import { Button, Input } from "@headlessui/react";
import { useState } from "react";
import useCartStore from "../../store/cart";
import { FiMinus, FiPlus } from "react-icons/fi";

export function Cart() {
  const [isMzyCodeOpen, setIsMzyCodeOpen] = useState(false);
  const { productsInCart, addQuantityToProductInCart, removeQuantityFromProductInCart } = useCartStore();

  const subtotal = productsInCart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const handleAddQuantity = (productId: string, size: string) => {
    addQuantityToProductInCart(productId, 1, size);
  };

  const handleRemoveQuantity = (productId: string, size: string) => {
    removeQuantityFromProductInCart(productId, 1, size);
  };

  return (
    <div className="flex flex-col p-4 py-0">
      <h3 className="text-base font-medium mb-2">ORDER SUMMARY</h3>
      {productsInCart.length > 0 ? (
        <div className="flex flex-col gap-2">
          {productsInCart.map((product) => (
            <div key={`${product.id}-${product.size}`} className="w-full flex items-center gap-3">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
              <div className="flex flex-col w-full">
                <div className="flex w-full justify-between items-center gap-2">
                  <span>{product.name}</span>
                  <span>${product.price * product.quantity}</span>
                </div>
                <div className="flex w-full justify-between items-center gap-2">
                  <span>SIZE</span>
                  <span>{product.size}</span>
                </div>
                <div className="flex w-full justify-between items-center gap-2">
                  <span>QTY</span>
                  <div className="flex items-center gap-4">
                    <FiPlus size={14} onClick={() => handleAddQuantity(product.id, product.size)} className="cursor-pointer" />
                    <span>{product.quantity}</span>
                    <FiMinus size={14} onClick={() => handleRemoveQuantity(product.id, product.size)} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2 p-32">
          <span>YOUR CART IS EMPTY</span>
        </div>
      )}
      <div className="flex justify-between items-center gap-2 mt-4">
        <span>SUBTOTAL</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {productsInCart.length > 0 && (
        <div className="flex justify-between items-center gap-2">
          <span>SHIPPING</span>
          <span> CALCULATED AT NEXT STEP</span>
        </div>
      )}
      <div className="flex justify-between items-center gap-2">
        <span>TAXES</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between items-center gap-2 mt-4 mb-2">
        <span className="font-medium">TOTAL</span>
        <span className="font-medium">${(subtotal + 0).toFixed(2)}</span>
      </div>
      {isMzyCodeOpen && (
        <div className="flex flex-row gap-2 mb-2">
          <Input
            type="text"
            placeholder="MZY CODE"
            className="w-full border border-black p-3"
          />
          <Button className="w-[20%] bg-black text-white p-3">APPLY</Button>
        </div>
      )}
      <span
        className="text-xs text-black/30 w-fit border-b border-black/30 cursor-pointer"
        onClick={() => setIsMzyCodeOpen(!isMzyCodeOpen)}
      >
        {isMzyCodeOpen ? "CANCEL" : "MZY CODE"}
      </span>
    </div>
  );
}
