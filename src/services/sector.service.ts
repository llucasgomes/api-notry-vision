import { setores } from "../db/sectors";
import { sectorRequest } from "../types/sector";
import { FastifyReply, FastifyRequest } from "fastify";

export const allSectorService = (req: FastifyRequest, res: FastifyReply) => {
  res.code(200).send(setores);
};

export const createSectorService = (req: FastifyRequest, res: FastifyReply) => {
 try {
   const { name } = req.body as sectorRequest;

  setores.push({
    id: crypto.randomUUID(),
    name,
  });

  res.code(201).send();
 } catch (error) {
   console.log(error);
    res.code(500).send({ message: "Erro no Servidor" });
 }
};

export const findSectorById =(req: FastifyRequest, res: FastifyReply) =>{

  try {
     const { id } = req.params as { id: string };

  if (!id || typeof id !== "string") {
    return res.status(400).send({ message: "ID não informado" });
  }

  // procurar o setor
  const isSetor = setores.filter((setor) => setor.id === id);
  console.log(isSetor)

    if (!isSetor) {
      return res.code(404).send({ message: "Setor não encontrado" })
    }

    return res.status(200).send(isSetor[0]);
  } catch (error) {
       console.log(error);
    res.code(500).send({ message: "Erro no Servidor" });
  }
}

export const deleteSectorService = (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.code(400).send({ message: "ID não informado" });
    }

    // procurar o índice do setor
    const index = setores.findIndex((setor) => setor.id === id);

    if (index === -1) {
      return res.code(404).send({ message: "Setor não encontrado" });
    }

    // remover da lista
    setores.splice(index, 1);

    return res.code(200).send({
      message: "Setor removido com sucesso",
      deletedId: id,
    });
  } catch (error) {
    console.error(error);
    return res.code(500).send({ message: "Erro no servidor" });
  }
};

export const updateSectorService = (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const { id } = req.params as {id:string};
    const { name } = req.body as {name:string};

    if (!id) {
      return res.code(400).send({ message: "ID não informado" });
    }

    if (!name) {
      return res.code(400).send({ message: "Nome do setor é obrigatório" });
    }

    // encontrar índice do setor
    const index = setores.findIndex((setor) => setor.id === id);

    if (index === -1) {
      return res.code(404).send({ message: "Setor não encontrado" });
    }

    // atualizar setor
    setores[index] = {
      ...setores[index],
      name,
    };

    return res.code(200).send(setores[index]);
  } catch (error) {
    console.error(error);
    return res.code(500).send({ message: "Erro no servidor" });
  }
};
