import userController from "@/controllers/user.controller";
import type { FastifyInstance } from "fastify";

export async function userRoutes(server: FastifyInstance) {
  server.register(userController, { prefix: "user" });
}
