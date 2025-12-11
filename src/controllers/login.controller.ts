import { LoginService } from "@/services/login.service";
import type { FastifyInstance } from "fastify";

export default async function loginController(server: FastifyInstance) {
  server.post("/login", LoginService);
}
