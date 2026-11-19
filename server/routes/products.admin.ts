import type { FastifyInstance } from "fastify";
import { requireApiKey } from "../auth";
import { CATEGORIES, products, type ProductInput } from "../db";

const productBody = {
  type: "object",
  required: ["name", "price", "image", "category"],
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1, maxLength: 120 },
    price: { type: "number", minimum: 0 },
    image: { type: "string", minLength: 1, maxLength: 2048, pattern: "^https?://" },
    category: { type: "string", enum: [...CATEGORIES] },
  },
} as const;

const idParams = {
  type: "object",
  required: ["id"],
  properties: { id: { type: "string" } },
} as const;

export default async function productsAdminRoutes(app: FastifyInstance) {
  app.addHook("onRequest", requireApiKey);

  app.get("/", async () => products.listAll());

  app.post<{ Body: ProductInput }>("/", { schema: { body: productBody } }, async (request, reply) => {
    const product = products.create({ ...request.body, name: request.body.name.trim() });
    return reply.code(201).send(product);
  });

  app.put<{ Params: { id: string }; Body: ProductInput }>(
    "/:id",
    { schema: { params: idParams, body: productBody } },
    async (request, reply) => {
      const product = products.update(request.params.id, { ...request.body, name: request.body.name.trim() });
      if (!product) return reply.code(404).send({ error: "Product not found" });
      return product;
    },
  );

  app.delete<{ Params: { id: string } }>("/:id", { schema: { params: idParams } }, async (request, reply) => {
    if (!products.remove(request.params.id)) return reply.code(404).send({ error: "Product not found" });
    return reply.code(204).send();
  });
}
