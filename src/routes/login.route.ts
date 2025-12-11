import loginController from "@/controllers/login.controller";
import type { FastifyInstance } from "fastify";

export async function loginRoutes(server: FastifyInstance) {
  server.register(loginController, { prefix: "auth" });
}
