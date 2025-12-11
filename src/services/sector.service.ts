import { setores } from "@/db/sectors";
import { sectorRequest } from "@/types/sector";
import { FastifyReply, FastifyRequest } from "fastify";

export const allSectorService = (req: FastifyRequest, res: FastifyReply) => {
  res.code(200).send(setores);
};

export const createSectorService = (req: FastifyRequest, res: FastifyReply) => {
  const { name } = req.body as sectorRequest;

  setores.push({
    id: crypto.randomUUID(),
    name,
  });

  res.code(201).send();
};

export const deleteSectorService = (req: FastifyRequest, res: FastifyReply) => {
  const { id } = req.params as { id: string };

  if (!id || typeof id !== "string") {
    return res.status(400).send({ error: "ID não informado" });
  }

  // procurar o setor
  const isSetor = setores.findIndex((setor) => setor.id === id);

  if (isSetor === -1) {
    return res.status(404).send({ error: "Setor não encontrado" });
  }

  // remover da lista
  setores.splice(isSetor, 1);

  return res.status(200).send({
    message: "Setor removido com sucesso",
    deletedId: id,
  });
};
