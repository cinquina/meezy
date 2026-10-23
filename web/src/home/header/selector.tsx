import { Button } from "@headlessui/react";
import clsx from "clsx";
import useCategoryStore, { type Category, type CategoryStore } from "../../store/category";

export function CategorySelector() {
  const { selectedCategory, setSelectedCategory } = useCategoryStore() as CategoryStore;

  const categories: Category[] = ["male", "female"];

  return (
    <div className="flex items-center space-x-4 px-4 py-0">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <Button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={clsx(
              "cursor-pointer pb-1 font-medium uppercase transition duration-200 ease-in-out outline-none",
              "data-hover:text-black data-active:scale-[0.98]",
              isSelected
                ? "text-black"
                : "text-black/25"
            )}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}
