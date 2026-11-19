import { useState, type SyntheticEvent } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { FiCheck, FiX } from "react-icons/fi";
import type { AdminProduct, Category, ProductInput } from "./api";

const categories: Category[] = ["male", "female"];

const inputClass =
  "w-full border-b border-black/25 bg-transparent pb-1 outline-none transition duration-200 placeholder:text-black/25 data-focus:border-black";

const empty = { name: "", price: "", image: "", category: "male" as Category };

export function ProductForm({
  open,
  product,
  onClose,
  onSubmit,
}: {
  open: boolean;
  product: AdminProduct | null;
  onClose: () => void;
  onSubmit: (input: ProductInput) => Promise<void>;
}) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [wasOpen, setWasOpen] = useState(false);

  // reset the fields each time the dialog opens (state adjusted during render, no effect).
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setError(null);
      setForm(
        product
          ? { name: product.name, price: String(product.price), image: product.image, category: product.category }
          : empty,
      );
    }
  }

  const price = Number(form.price);
  const valid =
    form.name.trim() !== "" &&
    form.price !== "" &&
    Number.isFinite(price) &&
    price >= 0 &&
    /^https?:\/\//.test(form.image.trim());

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!valid || pending) return;
    setPending(true);
    setError(null);
    try {
      await onSubmit({ name: form.name.trim(), price, image: form.image.trim(), category: form.category });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-40">
        <TransitionChild>
          <div className="fixed inset-0 bg-white transition duration-300 data-closed:opacity-0" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <TransitionChild>
            <DialogPanel className="flex min-h-full flex-col bg-white transition duration-500 data-closed:translate-y-8 data-closed:opacity-0">
              <div className="flex items-center justify-between p-4">
                <Button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="cursor-pointer transition duration-200 data-hover:opacity-70"
                >
                  <FiX size={24} />
                </Button>
                <DialogTitle className="font-medium uppercase">{product ? "Edit product" : "New product"}</DialogTitle>
                <span className="w-6" aria-hidden="true" />
              </div>

              <form onSubmit={submit} className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 p-4">
                <div className="flex h-48 w-48 items-center justify-center">
                  {/^https?:\/\//.test(form.image.trim()) ? (
                    <img src={form.image.trim()} alt="" className="h-48 w-48 object-contain" />
                  ) : (
                    <span className="text-sm uppercase text-black/25">No image</span>
                  )}
                </div>

                <Field className="flex w-full flex-col gap-2">
                  <Label className="text-sm uppercase text-black/60">Name</Label>
                  <Input
                    autoFocus
                    value={form.name}
                    maxLength={120}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="PD-00"
                    className={inputClass}
                  />
                </Field>

                <Field className="flex w-full flex-col gap-2">
                  <Label className="text-sm uppercase text-black/60">Price ($)</Label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="20"
                    className={inputClass}
                  />
                </Field>

                <Field className="flex w-full flex-col gap-2">
                  <Label className="text-sm uppercase text-black/60">Image URL</Label>
                  <Input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://…"
                    className={inputClass}
                  />
                </Field>

                <div className="flex w-full flex-col gap-2">
                  <span className="text-sm uppercase text-black/60">Category</span>
                  <div className="flex items-center gap-4">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        type="button"
                        onClick={() => setForm({ ...form, category })}
                        aria-pressed={form.category === category}
                        className={clsx(
                          "cursor-pointer pb-1 font-medium uppercase outline-none transition duration-200 ease-in-out",
                          "data-hover:text-black data-active:scale-[0.98]",
                          form.category === category ? "text-black" : "text-black/25",
                        )}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <p role="alert" className="min-h-5 text-sm uppercase text-red-600">
                  {error}
                </p>

                <Button
                  type="submit"
                  disabled={!valid || pending}
                  className="flex cursor-pointer items-center gap-2 font-medium uppercase transition duration-200 ease-in-out data-hover:opacity-70 data-active:scale-95 data-disabled:cursor-default data-disabled:opacity-25"
                >
                  <FiCheck size={20} /> {pending ? "Saving…" : "Save"}
                </Button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
