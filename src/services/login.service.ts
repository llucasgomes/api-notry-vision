import { users } from "@/db/users";
import type { LoginRequest, LoginResponse } from "@/types/login";

import type { FastifyReply, FastifyRequest } from "fastify";

export const LoginService = (req: FastifyRequest, reply: FastifyReply) => {
  const { password, username } = req.body as LoginRequest;

  try {
    const isUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!isUser) {
      reply.code(401).send({ message: "credenciais inválidas" });
    }

    const { id, name, cargo } = isUser as LoginResponse;
    reply.code(200).send({ id, username, name, cargo });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ message: "Erro no Servidor" });
  }
};
