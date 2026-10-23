import { Button } from "@headlessui/react";
import { Header } from "./header/main";
import { Products } from "./header/products";
import clsx from "clsx";

export function Home() {
  const sections: string[] = [
    "CONTACT",
    "TERMS",
    "PRIVACY",
    "ACCESSIBILITY",
    "DNSMPI",
    "COOKIES",
    "ORDER STATUS",
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Products />
      </main>

      <footer className="flex items-center justify-center p-6 text-center gap-8">
        {sections.map((section) => (
          <Button
            key={section}
            type="button"
            className={clsx(
              "cursor-pointer text-sm pb-1 uppercase transition duration-200 ease-in-out outline-none text-black/60",
              "data-hover:text-black/35 data-active:scale-[0.98]",
            )}
          >
            {section}
          </Button>
        ))}
      </footer>
    </div>
  );
}
