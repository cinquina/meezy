import { Button } from "@headlessui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function ProductGallery({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex h-[min(60vh,32rem)] flex-none items-center justify-center gap-8 px-4">
      {hasPrevious ? (
        <Button type="button" onClick={onPrevious} aria-label="Previous product" className="cursor-pointer">
          <FiChevronLeft size={28} />
        </Button>
      ) : <span className="w-7" aria-hidden="true" />}
      <div className="h-64 w-64 rounded-full bg-gray-100 sm:h-96 sm:w-96" />
      {hasNext ? (
        <Button type="button" onClick={onNext} aria-label="Next product" className="cursor-pointer">
          <FiChevronRight size={28} />
        </Button>
      ) : <span className="w-7" aria-hidden="true" />}
    </div>
  );
}
