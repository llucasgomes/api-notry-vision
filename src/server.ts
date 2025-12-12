import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import ScalarFastifyApiReference from "@scalar/fastify-api-reference";
import fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";
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
import { userRoutes } from "./routes/user.route";

//Instaciar o servidor
const server: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>();

//Configurações
server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

//functions inciaveis com o servidor
simulator.iniciarTodas(machines);

//Plugins
server.register(fastifyCors);
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API - Notry Vision",
      version: "1.0.0",
      description: `
A **API Notry Vision** fornece dados staticos para o projeto WEB.

### 📦 Convenções
- Todas as respostas são no formato **JSON**
- Status HTTP seguem os padrões:
  - \`200\` Sucesso
  - \`201\` Criado
  - \`400\` Requisição inválida
  - \`401\` Não autorizado
  - \`404\` Não encontrado
  - \`500\` Erro interno

---
🔧 **Suporte**: entre em contato com a equipe Notry Vision em caso de dúvidas.
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

//rotas
server.get("/", (req: FastifyRequest, replay: FastifyReply) => {
  replay.status(200).send({ message: "servidor ok" });
});

server.register(loginRoutes);
server.register(userRoutes);
server.register(machinesRoutes);

//configurações de porta
const PORT = Number(process.env.PORT) || 3000;

server
  .listen({ port: PORT, host: "0.0.0.0" })
  .then((address) => {
    console.log(`🚀 HTTP em ${address}`);
    console.log(`📡 WS em ${address.replace("http", "ws")}/ws`);
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  });
