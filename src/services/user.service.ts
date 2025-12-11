import { users } from "@/db/users";
import { userRequest } from "@/types/user";
import { FastifyReply, FastifyRequest } from "fastify";

export const getAllUserService = (req: FastifyRequest, res: FastifyReply) => {
  try {
    const allUsers = users;
    res.code(200).send(allUsers);
  } catch (error) {
    res.code(500).send({ message: "Erro interno" });
  }
};

export const createUser = (req: FastifyRequest, res: FastifyReply) => {
  const { cargo, name, password, username } = req.body as userRequest;

  try {
    const userExist = users.find((user) => user.username == username);

    if (userExist)
      res.code(409).send({ message: "Já existe um usuario com esse username" });

    users.push({
      id: crypto.randomUUID(),
      cargo,
      name,
      password,
      username,
    });

    res.code(201).send();
  } catch (error) {
    res.code(500).send({ message: "Erro interno" });
  }
};

export const deleteUserById = (req: FastifyRequest, res: FastifyReply) => {
  const { id } = req.params as { id: string };

  try {
    if (!id || typeof id !== "string") {
      return res.status(400).send({ message: "ID não informado" });
    }

    // procurar o usuário
    const isUser = users.findIndex((user) => user.id === id);

    if (isUser === -1) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    // remover da lista
    users.splice(isUser, 1);

    return res.status(200).send({
      message: "Usuário removido com sucesso",
      deletedId: id,
    });
  } catch (error) {
    res.code(500).send({ message: "Erro interno" });
  }
};

export const findUserById = (req: FastifyRequest, res: FastifyReply) => {
  const { id } = req.params as { id: string };

  try {
    if (!id || typeof id !== "string") {
      return res.status(400).send({ message: "ID não informado" });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send(user);
  } catch (error) {
    res.code(500).send({ message: "Erro interno" });
  }
};
