import Fastify from "fastify";
import healthRoutes from "./routes/health";
import productsRoutes from "./routes/products";
import productsAdminRoutes from "./routes/products.admin";

const app = Fastify({ logger: true });

await app.register(healthRoutes, { prefix: "/health" });
await app.register(productsRoutes, { prefix: "/products" });
await app.register(productsAdminRoutes, { prefix: "/admin/products" });

await app.listen({ port: Number(process.env.PORT ?? 3000), host: "0.0.0.0" });
