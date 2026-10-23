import {
  Field,
  Label,
  Input,
  Checkbox,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FiCheck, FiChevronDown, FiCreditCard, FiLock } from "react-icons/fi";

export function BillingCard() {
  return (
    <div className="flex flex-col p-4 py-0">
      <h3 className="text-base font-medium mb-2">CONTACT INFORMATION</h3>
      <Field>
        <Label>EMAIL ADDRESS</Label>
        <Input className="w-full border border-black p-3" />
      </Field>
      <h3 className="text-base font-medium mb-2 mt-5">BILLING ADDRESS</h3>
      <div className="flex flex-col gap-4 mb-2">
        <Field>
          <Label>ADDRESS</Label>
          <Input
            placeholder="START TYPING YOUR ADDRESS..."
            className="w-full border border-black p-3"
          />
        </Field>
        <Field>
          <Label className="text-sm ">
            APARTMENT, SUITE, UNIT, ETC. (OPTIONAL)
          </Label>
          <Input
            placeholder="START TYPING YOUR ADDRESS..."
            className="w-full border border-black p-3"
          />
        </Field>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <Field className="flex-1">
            <Label>CITY</Label>
            <Input className="w-full border border-black p-3" />
          </Field>
          <Field className="flex-1">
            <Label>STATE / PROVINCE</Label>
            <Input className="w-full border border-black p-3" />
          </Field>
          <Field className="flex-1">
            <Label>ZIP / POSTAL CODE</Label>
            <Input className="w-full border border-black p-3" />
          </Field>
          <Field className="flex-1">
            <Label>COUNTRY</Label>
            <Input className="w-full border border-black p-3" />
          </Field>
        </div>
      </div>
      <h3 className="text-base font-medium mb-2 mt-5">PAYMENT DETAILS</h3>
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex items-center justify-between gap-4 bg-black p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 border border-white text-white">
              <FiCreditCard />
            </div>
            <div>
              <p className="text-white text-sm font-medium">
                CREDIT CARD / DEBIT CARD
              </p>
              <p className="text-white/50 text-xs">
                Visa, Mastercard, Amex, Discover
              </p>
            </div>
          </div>

          <Checkbox checked={true} className="group flex size-6 items-center justify-center bg-black border border-white data-checked:bg-white">
            <svg
              className="size-4 stroke-black opacity-0 group-data-checked:opacity-100"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Checkbox>
        </div>
        <Field>
          <Label className="font-medium">CARD HOLDER NAME</Label>
          <Input
            placeholder="START TYPING YOUR ADDRESS..."
            className="w-full border border-black p-3"
          />
        </Field>
        <Field>
          <Label className="font-medium">CARD NUMBER</Label>
          <Input
            placeholder="START TYPING YOUR ADDRESS..."
            className="w-full border border-black p-3"
          />
        </Field>
        <DateSelector />
        <div className="flex justify-start items-center bg-black/5 text-black p-4 gap-4">
          <FiLock />
          <div>
            <p className="text-black text-xs font-medium">SECURE PAYMENT</p>
            <p className="text-black/50 text-xs">
              All transactions are encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DateSelector() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Field>
        <Label className="font-medium">EXP MONTH</Label>
        <Listbox name="expMonth">
          <div className="relative">
            <ListboxButton className="w-full border border-black bg-white p-3 text-left data-focus:outline-2 data-focus:outline-black">
              {({ value }) => (
                <span className="flex items-center justify-between">
                  {value || "MM"}
                  <FiChevronDown className="size-4" />
                </span>
              )}
            </ListboxButton>

            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto border border-black bg-white">
              {Array.from({ length: 12 }, (_, i) => {
                const month = String(i + 1).padStart(2, "0");

                return (
                  <ListboxOption
                    key={month}
                    value={month}
                    className="flex cursor-pointer items-center justify-between p-3 data-focus:bg-black data-focus:text-white"
                  >
                    {month}
                    <FiCheck className="size-4 opacity-0 group-data-selected:opacity-100" />
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </div>
        </Listbox>
      </Field>

      <Field>
        <Label className="font-medium">EXP YEAR</Label>
        <Listbox name="expYear">
          <div className="relative">
            <ListboxButton className="w-full border border-black bg-white p-3 text-left data-focus:outline-2 data-focus:outline-black">
              {({ value }) => (
                <span className="flex items-center justify-between">
                  {value || "YY"}
                  <FiChevronDown className="size-4" />
                </span>
              )}
            </ListboxButton>

            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto border border-black bg-white">
              {Array.from({ length: 15 }, (_, i) => {
                const year = String(new Date().getFullYear() + i).slice(-2);

                return (
                  <ListboxOption
                    key={year}
                    value={year}
                    className="flex cursor-pointer items-center justify-between p-3 data-focus:bg-black data-focus:text-white"
                  >
                    {year}
                    <FiCheck className="size-4 opacity-0 group-data-selected:opacity-100" />
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </div>
        </Listbox>
      </Field>

      <Field>
        <Label className="font-medium">SECURITY CODE</Label>
        <Input
          placeholder="CVC"
          inputMode="numeric"
          maxLength={4}
          className="w-full border border-black p-3"
        />
      </Field>
    </div>
  );
}
