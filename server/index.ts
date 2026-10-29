import Fastify from "fastify";
import healthRoutes from "./routes/health";
import productsAdminRoutes from "./routes/products.admin";

const app = Fastify({ logger: true });
    
await app.register(healthRoutes, { prefix: "/health" })
await app.register(productsAdminRoutes, { prefix: "/admin/products" })

await app.listen({ port: 3000, host: "0.0.0.0" });