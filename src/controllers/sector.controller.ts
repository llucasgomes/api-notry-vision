import { allSectorService, createSectorService, deleteSectorService, findSectorById, updateSectorService } from "../services/sector.service";

import type { FastifyInstance } from "fastify";
import z from "zod";

export default async function sectorController(server: FastifyInstance) {
  server.get(
    "",
    {
      schema: {
        description: "Busca todos os Stores",
        tags: ["Sector"],
        response: {
          200: z
            .array(
              z.object({
                id: z.string(),
                name: z.string(),
              })
            )
            .describe("Evento processado com sucesso"),
          500: z
            .object({
              message: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    allSectorService
  );
  server.post(
    "",
    {
      schema: {
        description: "Criar um novo Setor",
        tags: ["Sector"],
        body: z.object({
          name: z.string().min(1, "Name é obrigatório"),
        }),
        response: {
          201: z.object({}).describe("Evento processado com sucesso"),
          500: z
            .object({
              message: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    createSectorService
  );
  server.delete(
    "/:id",
    {
      schema: {
        description: "deleta o setor pelo ID",
        tags: ["Sector"],
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
            .describe("Setor não encontrado"),
          500: z
            .object({
              message: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    deleteSectorService
  );
  server.get(
    "/:id",
    {
      schema: {
        description: "Busca o Setor pelo ID",
        tags: ["Sector"],
        params: z.object({ id: z.string().uuid() }),
        response: {
          200: z
            .object({
              id: z.string(),
              name: z.string(),
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
            .describe("Setor não encontrado"),
          500: z
            .object({
              message: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    findSectorById
  );
  server.put(
    "/:id",
    {
      schema: {
        description: "Atualiza o Setor pelo ID",
        tags: ["Sector"],
        params: z.object({ id: z.string().uuid() }),
        body: z.object({name:z.string()}),
        response: {
          200: z
            .object({
              id: z.string(),
              name: z.string(),
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
            .describe("Setor não encontrado"),
          500: z
            .object({
              message: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    updateSectorService
  );
}
