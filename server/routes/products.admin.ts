import type { FastifyInstance } from "fastify";

export default async function productsAdminRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return {
      status: "ok",
      uptime: process.uptime().toFixed(2),
    };  
  });
}
