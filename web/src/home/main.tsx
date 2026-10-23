import { useState } from "react";
import { Button } from "@headlessui/react";
import { Header } from "./header/main";
import { Products } from "./products";
import clsx from "clsx";
import { CartDrawer } from "./cart/main";

export function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    <>
      <div className="flex min-h-screen flex-col">
        <Header onCartClick={() => setIsCartOpen(true)} />

        <main className="flex-1">
          <Products />
        </main>

        <footer className="flex items-center justify-center gap-8 p-6 text-center">
          {sections.map((section) => (
            <Button
              key={section}
              type="button"
              className={clsx(
                "cursor-pointer pb-1 text-sm uppercase text-black/60 outline-none transition duration-200 ease-in-out",
                "data-[hover]:text-black/35 data-[active]:scale-[0.98]"
              )}
            >
              {section}
            </Button>
          ))}
        </footer>
      </div>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
