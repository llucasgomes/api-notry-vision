import sectorController from "../controllers/sector.controller";
import type { FastifyInstance } from "fastify";

export async function sectorRoutes(server: FastifyInstance) {
  server.register(sectorController, { prefix: "sector" });
}
