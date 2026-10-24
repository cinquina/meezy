import { Button } from "@headlessui/react";
import { FiHelpCircle, FiX } from "react-icons/fi";

const sizes = [["1", "S"], ["2", "M"], ["3", "L"]];

export function SizeSelector({ price, onClose }: { price: string; onClose: () => void }) {
  return (
    <>
      <div className="grid w-full grid-cols-3 items-center">
        <Button type="button" aria-label="Size information" className="justify-self-start cursor-pointer"><FiHelpCircle size={24} /></Button>
        <h1 className="text-center text-base font-medium uppercase">Select size</h1>
        <Button type="button" onClick={onClose} aria-label="Close size selector" className="justify-self-end cursor-pointer"><FiX size={24} /></Button>
      </div>
      <p className="mt-4 text-base font-medium">{price}</p>
      <div className="mt-4 grid w-full grid-cols-3 text-base font-medium">
        {sizes.map(([number, letter]) => (
          <Button key={number} type="button" className="group relative h-8 w-8 justify-self-center cursor-pointer first:justify-self-start last:justify-self-end">
            <span className="absolute inset-0 flex items-center justify-center transition duration-200 ease-out group-hover:-translate-y-1 group-hover:opacity-0">{number}</span>
            <span className="absolute inset-0 flex translate-y-1 items-center justify-center opacity-0 transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">{letter}</span>
          </Button>
        ))}
      </div>
      <Button type="button" className="mt-4 cursor-pointer text-base font-medium uppercase">Information</Button>
    </>
  );
}
