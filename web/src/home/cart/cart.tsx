import { Button, Input } from "@headlessui/react";
import { useState } from "react";

export function Cart() {
  const [isMzyCodeOpen, setIsMzyCodeOpen] = useState(false);
  return (
    <div className="flex flex-col p-4 py-0">
      <h3 className="text-base font-medium mb-2">ORDER SUMMARY</h3>
      <div className="flex justify-center items-center gap-2 p-32">
        <span>YOUR CART IS EMPTY</span>
      </div>
      <div className="flex justify-between items-center gap-2">
        <span>SUBTOTAL</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between items-center gap-2">
        <span>TAXES</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between items-center gap-2 mt-4 mb-2">
        <span className="font-medium">TOTAL</span>
        <span className="font-medium">$0.00</span>
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
