import { FaPlus } from "react-icons/fa6";
import { FiPlus, FiShoppingBag } from "react-icons/fi";
import { CategorySelector } from "./selector";

export function Header() {
    
  return (
    <header className="flex items-center justify-between p-4">
      <FiPlus size={24} />
      <CategorySelector />
      <FiShoppingBag size={20} />
    </header>
  )
}