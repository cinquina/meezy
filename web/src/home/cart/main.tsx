import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  Button,
} from "@headlessui/react";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { BillingCard } from "./billing";
import { Cart } from "./cart";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-50 w-full">
        <TransitionChild>
          <div
            className="fixed inset-0 bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0"
            aria-hidden="true"
          />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 flex justify-end">
            <TransitionChild>
              <DialogPanel
                className="
                  flex h-full w-full max-w-full flex-col bg-white shadow-2xl
                  transition duration-300 ease-out
                  data-[closed]:translate-x-full
                "
              >
                <div className="flex items-center justify-between p-4">
                  <Button
                    type="button"
                    onClick={onClose}
                    aria-label="Close cart"
                    className="cursor-pointer text-black transition duration-200 ease-in-out data-[hover]:opacity-60 data-[active]:scale-95"
                  >
                    <FiArrowLeft size={20} />
                  </Button>
                  <FiShoppingBag size={20} />
                </div>

                <div className="flex-1 grid grid-cols-2 gap-6 overflow-y-auto p-4">
                  <BillingCard />
                  <Cart />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
