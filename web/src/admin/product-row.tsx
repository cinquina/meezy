import { useState } from "react";
import { Button } from "@headlessui/react";
import { FiCheck, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import type { AdminProduct } from "./api";

const iconButton =
  "cursor-pointer transition duration-200 ease-in-out data-hover:opacity-70 data-active:scale-95";

export function ProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: AdminProduct;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <li className="flex items-center gap-4 py-4">
      <img src={product.image} alt={product.name} className="h-16 w-16 flex-none object-contain" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{product.name}</p>
        <p className="text-sm uppercase text-black/60">
          ${product.price} · {product.category}
        </p>
      </div>
      {confirming ? (
        <div className="flex items-center gap-4">
          <span className="text-sm uppercase text-black/60">Delete?</span>
          <Button type="button" aria-label="Confirm delete" onClick={() => void onDelete()} className={`${iconButton} text-red-600`}>
            <FiCheck size={20} />
          </Button>
          <Button type="button" aria-label="Cancel delete" onClick={() => setConfirming(false)} className={iconButton}>
            <FiX size={20} />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button type="button" aria-label={`Edit ${product.name}`} onClick={onEdit} className={iconButton}>
            <FiEdit2 size={18} />
          </Button>
          <Button type="button" aria-label={`Delete ${product.name}`} onClick={() => setConfirming(true)} className={iconButton}>
            <FiTrash2 size={18} />
          </Button>
        </div>
      )}
    </li>
  );
}
