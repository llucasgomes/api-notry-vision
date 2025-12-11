import { LoginService } from "@/services/login.service";
import type { FastifyInstance } from "fastify";
import z from "zod";

export default async function loginController(server: FastifyInstance) {
  server.post(
    "/login",
    {
      schema: {
        description: "Verifica se o usuário tem permissão de acesso",
        tags: ["Login"],
        body: z.object({
          username: z.string().min(1, "Username é obrigatório"),
          password: z.string().min(1, "Password é obrigatório"),
        }),
        response: {
          200: z
            .object({
              id: z.string(),
              username: z.string(),
              name: z.string(),
              cargo: z.string(),
            })
            .describe("Evento processado com sucesso"),
          401: z
            .object({
              messsage: z.string(),
            })
            .describe("credenciais inválidas"),
          500: z
            .object({
              messsage: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    LoginService
  );
}
