import { create } from "zustand";

export type Category = "male" | "female";

export type CategoryStore = {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};

const useCategoryStore = create((set) => ({
  selectedCategory: "male",
  setSelectedCategory: (category: Category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;