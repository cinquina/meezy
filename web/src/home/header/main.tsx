import { Button } from "@headlessui/react";
import { FiPlus, FiShoppingBag } from "react-icons/fi";
import { CategorySelector } from "./selector";

type HeaderProps = {
  onCartClick: () => void;
};

export function Header({ onCartClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <FiPlus size={24} />

      <CategorySelector />

      <Button
        type="button"
        onClick={onCartClick}
        aria-label="Open cart"
        className="cursor-pointer text-black transition duration-200 ease-in-out data-[hover]:opacity-70 data-[active]:scale-95"
      >
        <FiShoppingBag size={20} />
      </Button>
    </header>
  );
}
