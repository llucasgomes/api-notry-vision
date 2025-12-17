import machinesController from "../controllers/machines.controller";
import type { FastifyInstance } from "fastify";

export async function machinesRoutes(server: FastifyInstance) {
  server.register(machinesController, { prefix: "machines" });
}
