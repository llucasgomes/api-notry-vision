import { machines } from "@/db/machines";
import { FastifyReply, FastifyRequest } from "fastify";

export const getMachinesService = (req: FastifyRequest, res: FastifyReply) => {
  try {
    res.code(200).send(machines);
  } catch (error) {
    res.code(500).send({ message: "Erro no Servidor" });
  }
};
