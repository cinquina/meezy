import { useState, type SyntheticEvent } from "react";
import { Button, Field, Input, Label } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { UnauthorizedError } from "./api";

export function Login({ onLogin }: { onLogin: (key: string) => Promise<void> }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!key.trim() || pending) return;
    setPending(true);
    setError(null);
    try {
      await onLogin(key.trim());
    } catch (err) {
      setError(err instanceof UnauthorizedError ? "Invalid key" : "Server unreachable");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="p-4">
        <Link to="/" aria-label="Back to shop" className="inline-block transition duration-200 hover:opacity-70">
          <FiArrowLeft size={24} />
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <form onSubmit={submit} className="flex w-full max-w-xs flex-col items-center gap-6">
          <Field className="flex w-full flex-col items-center gap-4">
            <Label className="font-medium uppercase">Admin</Label>
            <Input
              type="password"
              autoFocus
              autoComplete="current-password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="API KEY"
              invalid={error !== null}
              className="w-full border-b border-black/25 bg-transparent pb-1 text-center outline-none transition duration-200 placeholder:text-black/25 data-focus:border-black data-invalid:border-red-600"
            />
          </Field>
          <p role="alert" className="h-5 text-sm uppercase text-red-600">
            {error}
          </p>
          <Button
            type="submit"
            disabled={pending || !key.trim()}
            aria-label="Enter"
            className="cursor-pointer transition duration-200 ease-in-out data-hover:opacity-70 data-active:scale-95 data-disabled:cursor-default data-disabled:opacity-25"
          >
            <FiArrowRight size={28} />
          </Button>
        </form>
      </main>
    </div>
  );
}
