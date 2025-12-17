import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import ScalarFastifyApiReference from "@scalar/fastify-api-reference";
import fastify, { type FastifyInstance } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { machines } from "./db/machines";
import { simulator } from "./functions/simulations";
import { loginRoutes } from "./routes/login.route";
import { machinesRoutes } from "./routes/machines.route";
import { sectorRoutes } from "./routes/sector.route";
import { userRoutes } from "./routes/user.route";

export function buildServer(): FastifyInstance {
  const server = fastify().withTypeProvider<ZodTypeProvider>();

  // Zod
  server.setSerializerCompiler(serializerCompiler);
  server.setValidatorCompiler(validatorCompiler);

  // ⚠️ CUIDADO NA VERCEL
  // Isso roda a cada cold start
  // simulator.iniciarTodas(machines);

  // Plugins
  server.register(fastifyCors, {
    origin: "*",
  });

  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "API - Notry Vision",
        version: "1.0.0",
        description: `
A **API Notry Vision** fornece dados estáticos para o projeto WEB.
        `,
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(ScalarFastifyApiReference, {
    routePrefix: "/docs",
    configuration: {
      theme: "kepler",
    },
  });

  // Rotas
  server.get("/", async () => {
    return { message: "servidor ok" };
  });

  server.get("/teste/machines", async () => {
    machines.forEach((m) => simulator.atualizarKpis(m));
    return machines;
  });

  server.register(loginRoutes);
  server.register(userRoutes);
  server.register(machinesRoutes);
  server.register(sectorRoutes);

  return server;
}
