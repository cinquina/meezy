import type { FastifyInstance } from "fastify";
import { CATEGORIES, products, type Category } from "../db";

export default async function productsRoutes(app: FastifyInstance) {
  app.get<{ Querystring: { category: Category } }>(
    "/",
    {
      schema: {
        querystring: {
          type: "object",
          required: ["category"],
          properties: { category: { type: "string", enum: [...CATEGORIES] } },
        },
      },
    },
    async (request) => products.listByCategory(request.query.category),
  );
}
