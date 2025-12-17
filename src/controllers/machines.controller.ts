import { getMachinesService } from "../services/machine.service";
import {
  alertaSchema,
  configSimulacaoSchema,
  kpisAtuaisSchema,
  metasSchema,
  registroHistoricoSchema,
} from "../validations/machine-schema";

import type { FastifyInstance } from "fastify";
import z from "zod";

export default async function machinesController(server: FastifyInstance) {
  server.get(
    "",
    {
      schema: {
        description: "Busca todas as maquinas com suas informações",
        tags: ["Machines"],
        response: {
          200: z
            .array(
              z.object({
                id: z.string(),
                nome: z.string(),
                setor: z.string(),
                status: z.string(),
                alerta: alertaSchema,
                kpisAtuais: kpisAtuaisSchema,
                metas: metasSchema,
                pecasDefeituosas: z.array(z.string()),
                historico: z.array(registroHistoricoSchema),
                simulacao: configSimulacaoSchema,
                ultimaAtualizacao: z.string().nullable(),
              })
            )
            .describe("Lista de máquinas retornada com sucesso"),
          500: z
            .object({
              messsage: z.string(),
            })
            .describe("Erro desconhecido"),
        },
      },
    },
    getMachinesService
  );
}
