import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import ScalarFastifyApiReference from "@scalar/fastify-api-reference";
import fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";
import { loginRoutes } from "./routes/login.route";

//Instaciar o servidor
const server: FastifyInstance = fastify();

//Plugins
server.register(fastifyCors);
server.register(fastifySwagger, {});
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
