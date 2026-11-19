import { useEffect, useState } from "react";
import type { Category } from "../../store/category";
import type { Product } from "./types";

type Result = { category: Category; products: Product[]; error: boolean };

export function useProducts(category: Category) {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/products?category=${category}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Product[]>;
      })
      .then((products) => setResult({ category, products, error: false }))
      .catch((err: unknown) => {
        if (!controller.signal.aborted) setResult({ category, products: [], error: true });
        if (!(err instanceof DOMException && err.name === "AbortError")) console.error(err);
      });
    return () => controller.abort();
  }, [category]);

  // results from a previous category count as still loading.
  const current = result?.category === category ? result : null;
  return { products: current?.products ?? [], loading: current === null, error: current?.error ?? false };
}
