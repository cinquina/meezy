import { useCallback, useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLogOut, FiPlus } from "react-icons/fi";
import { adminApi, UnauthorizedError, type AdminProduct } from "./api";
import { Login } from "./login";
import { ProductForm } from "./product-form";
import { ProductRow } from "./product-row";

const KEY_STORAGE = "meezy-admin-key";

function readKey() {
  try {
    return sessionStorage.getItem(KEY_STORAGE);
  } catch {
    return null;
  }
}

export function Admin() {
  const [storedKey] = useState(readKey);
  const [apiKey, setApiKey] = useState<string | null>(storedKey);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(storedKey !== null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminProduct | "new" | null>(null);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(KEY_STORAGE);
    } catch {
      // ignore
    }
    setApiKey(null);
    setProducts([]);
    setEditing(null);
  }, []);

  const handleError = useCallback(
    (err: unknown) => {
      if (err instanceof UnauthorizedError) logout();
      else setError(err instanceof Error ? err.message : "Something went wrong");
    },
    [logout],
  );

  // restore the session from a key saved earlier; fresh logins load the list in `login`.
  useEffect(() => {
    if (!storedKey) return;
    adminApi
      .list(storedKey)
      .then(setProducts)
      .catch(handleError)
      .finally(() => setLoading(false));
  }, [storedKey, handleError]);

  const login = async (key: string) => {
    // validate before persisting, so a wrong key never sticks.
    const list = await adminApi.list(key);
    try {
      sessionStorage.setItem(KEY_STORAGE, key);
    } catch {
      // keep it in memory only
    }
    setProducts(list);
    setApiKey(key);
  };

  if (!apiKey) return <Login onLogin={login} />;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between p-4">
        <Link to="/" aria-label="Back to shop" className="transition duration-200 hover:opacity-70">
          <FiArrowLeft size={24} />
        </Link>
        <h1 className="font-medium uppercase">Admin</h1>
        <Button
          type="button"
          onClick={logout}
          aria-label="Log out"
          className="cursor-pointer transition duration-200 ease-in-out data-hover:opacity-70 data-active:scale-95"
        >
          <FiLogOut size={20} />
        </Button>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase text-black/60">
            {loading ? "Loading…" : `${products.length} products`}
          </p>
          <Button
            type="button"
            onClick={() => setEditing("new")}
            className="flex cursor-pointer items-center gap-2 text-sm font-medium uppercase transition duration-200 ease-in-out data-hover:opacity-70 data-active:scale-[0.98]"
          >
            <FiPlus size={18} /> Add product
          </Button>
        </div>

        {error && (
          <p role="alert" className="text-sm uppercase text-red-600">
            {error}
          </p>
        )}

        {!loading && products.length === 0 ? (
          <p className="py-16 text-center text-sm uppercase text-black/25">No products yet</p>
        ) : (
          <ul className="divide-y divide-black/10">
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={() => setEditing(product)}
                onDelete={async () => {
                  setError(null);
                  try {
                    await adminApi.remove(apiKey, product.id);
                    setProducts((list) => list.filter((p) => p.id !== product.id));
                  } catch (err) {
                    handleError(err);
                  }
                }}
              />
            ))}
          </ul>
        )}
      </main>

      <ProductForm
        open={editing !== null}
        product={editing === "new" ? null : editing}
        onClose={() => setEditing(null)}
        onSubmit={async (input) => {
          try {
            if (editing && editing !== "new") {
              const updated = await adminApi.update(apiKey, editing.id, input);
              setProducts((list) => list.map((p) => (p.id === updated.id ? updated : p)));
            } else {
              const created = await adminApi.create(apiKey, input);
              setProducts((list) => [created, ...list]);
            }
            setEditing(null);
          } catch (err) {
            if (err instanceof UnauthorizedError) logout();
            throw err;
          }
        }}
      />
    </div>
  );
}
