import {
  createUser,
  deleteUserById,
  findUserById,
  getAllUserService,
} from "@/services/user.service";

import type { FastifyInstance } from "fastify";
import z from "zod";

export default async function userController(server: FastifyInstance) {
  server.get(
    "",
    {
      schema: {
        description: "Busca todos os Usuarios",
        tags: ["User"],
        response: {
          200: z
            .array(
              z.object({
                id: z.string(),
                username: z.string(),
                name: z.string(),
                password: z.string(),
                cargo: z.string(),
              })
            )
            .describe("Evento processado com sucesso"),
          500: z
            .object({
              messsage: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    getAllUserService
  );
  server.post(
    "",
    {
      schema: {
        description: "Criar um novo Usuario",
        tags: ["User"],
        body: z.object({
          name: z.string().min(1, "Name é obrigatório"),
          cargo: z.string().min(1, "Cargo é obrigatório"),
          username: z.string().min(1, "Username é obrigatório"),
          password: z.string().min(1, "Password é obrigatório"),
        }),
        response: {
          201: z.object({}).describe("Evento processado com sucesso"),
          409: z
            .object({
              message: z.string(),
            })
            .describe("usuario ja existente"),
          500: z
            .object({
              messsage: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    createUser
  );
  server.delete(
    "/:id",
    {
      schema: {
        description: "deleta o usuario pelo ID",
        tags: ["User"],
        params: z.object({ id: z.string().uuid() }),
        response: {
          200: z
            .object({
              message: z.string(),
              deletedId: z.string(),
            })
            .describe("Evento processado com sucesso"),
          400: z
            .object({
              message: z.string(),
            })
            .describe("Id não informado"),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Usuario não encontrado"),
          500: z
            .object({
              messsage: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    deleteUserById
  );
  server.get(
    "/:id",
    {
      schema: {
        description: "Busca o Usuario pelo ID",
        tags: ["User"],
        params: z.object({ id: z.string().uuid() }),
        response: {
          200: z
            .object({
              id: z.string().uuid(),
              name: z.string(),
              cargo: z.string(),
              username: z.string(),
              password: z.string(),
            })
            .describe("Evento processado com sucesso"),
          400: z
            .object({
              message: z.string(),
            })
            .describe("Id não informado"),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Usuario não encontrado"),
          500: z
            .object({
              messsage: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    findUserById
  );
}
