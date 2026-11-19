export type Category = "male" | "female";

export type AdminProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  createdAt: string;
};

export type ProductInput = Omit<AdminProduct, "id" | "createdAt">;

export class UnauthorizedError extends Error {}

const BASE = "/api/admin/products";

async function request<T>(key: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "x-api-key": key,
      ...(init?.body ? { "content-type": "application/json" } : {}),
    },
  });
  if (res.status === 401) throw new UnauthorizedError("Invalid key");
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? body?.error ?? `Request failed (${res.status})`);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

export const adminApi = {
  list: (key: string) => request<AdminProduct[]>(key, "/"),
  create: (key: string, input: ProductInput) =>
    request<AdminProduct>(key, "/", { method: "POST", body: JSON.stringify(input) }),
  update: (key: string, id: string, input: ProductInput) =>
    request<AdminProduct>(key, `/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(input) }),
  remove: (key: string, id: string) =>
    request<void>(key, `/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
