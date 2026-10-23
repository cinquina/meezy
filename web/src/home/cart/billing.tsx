import { Field, Label, Input } from "@headlessui/react";

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
          <Label >ADDRESS</Label>
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
            <Label >CITY</Label>
            <Input className="w-full border border-black p-3" />
          </Field>
          <Field className="flex-1">
            <Label >STATE / PROVINCE</Label>
            <Input className="w-full border border-black p-3" />
          </Field>
          <Field className="flex-1">
            <Label >ZIP / POSTAL CODE</Label>
            <Input className="w-full border border-black p-3" />
          </Field>
          <Field className="flex-1">
            <Label >COUNTRY</Label>
            <Input className="w-full border border-black p-3" />
          </Field>
        </div>
      </div>
      <h3 className="text-base font-medium mb-2 mt-5">PAYMENT DETAILS</h3>
    </div>
  );
}
