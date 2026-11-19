import { Database } from "bun:sqlite";
import { seedProducts } from "./seed";

export const CATEGORIES = ["male", "female"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  createdAt: string;
};

export type ProductInput = Omit<Product, "id" | "createdAt">;

const db = new Database(process.env.DATABASE_PATH ?? "meezy.sqlite", { create: true, strict: true });

db.run("PRAGMA journal_mode = WAL;");
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id         TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    price      REAL NOT NULL CHECK (price >= 0),
    image      TEXT NOT NULL,
    category   TEXT NOT NULL CHECK (category IN ('male', 'female')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const SELECT = "SELECT id, name, price, image, category, created_at AS createdAt FROM products";

// admin sees newest first; the shop shows products in the order they were added.
const listAll = db.query<Product, []>(`${SELECT} ORDER BY rowid DESC`);
const listByCategory = db.query<Product, { category: Category }>(
  `${SELECT} WHERE category = $category ORDER BY rowid ASC`,
);
const getById = db.query<Product, { id: string }>(`${SELECT} WHERE id = $id`);
const insert = db.query(
  "INSERT INTO products (id, name, price, image, category) VALUES ($id, $name, $price, $image, $category)",
);
const update = db.query(
  "UPDATE products SET name = $name, price = $price, image = $image, category = $category WHERE id = $id",
);
const remove = db.query("DELETE FROM products WHERE id = $id");

const { count } = db.query<{ count: number }, []>("SELECT COUNT(*) AS count FROM products").get()!;
if (count === 0) {
  db.transaction(() => {
    for (const product of seedProducts) insert.run({ id: crypto.randomUUID(), ...product });
  })();
}

export const products = {
  listAll: () => listAll.all(),
  listByCategory: (category: Category) => listByCategory.all({ category }),
  get: (id: string) => getById.get({ id }),
  create: (input: ProductInput) => {
    const id = crypto.randomUUID();
    insert.run({ id, ...input });
    return getById.get({ id })!;
  },
  update: (id: string, input: ProductInput) => {
    const { changes } = update.run({ id, ...input });
    return changes ? getById.get({ id }) : null;
  },
  remove: (id: string) => remove.run({ id }).changes > 0,
};
