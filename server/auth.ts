import { createHash, timingSafeEqual } from "node:crypto";
import type { FastifyReply, FastifyRequest } from "fastify";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

if (!ADMIN_API_KEY || ADMIN_API_KEY.length < 16) {
  throw new Error("ADMIN_API_KEY mancante o troppo corta (min 16 caratteri). Vedi .env.example");
}

// hash both sides so the comparison is constant-time regardless of length.
const expected = createHash("sha256").update(ADMIN_API_KEY).digest();

export async function requireApiKey(request: FastifyRequest, reply: FastifyReply) {
  const provided = request.headers["x-api-key"];
  if (typeof provided !== "string" || provided.length === 0) {
    return reply.code(401).send({ error: "Missing API key" });
  }
  const actual = createHash("sha256").update(provided).digest();
  if (!timingSafeEqual(actual, expected)) {
    return reply.code(401).send({ error: "Invalid API key" });
  }
}
