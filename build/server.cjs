"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_cors = __toESM(require("@fastify/cors"), 1);
var import_swagger = __toESM(require("@fastify/swagger"), 1);
var import_fastify_api_reference = __toESM(require("@scalar/fastify-api-reference"), 1);
var import_fastify = __toESM(require("fastify"), 1);

// src/db/users.ts
var users = [
  {
    id: 1,
    username: "operador1",
    name: "Operador Um",
    password: "123456",
    cargo: "operador"
  },
  {
    id: 2,
    username: "supervisor1",
    name: "Supervisor Um",
    password: "123456",
    cargo: "supervisor"
  },
  {
    id: 3,
    username: "admin",
    name: "Administrador",
    password: "123456",
    cargo: "admin"
  }
];

// src/services/login.service.ts
var LoginService = (req, reply) => {
  const { password, username } = req.body;
  try {
    const isUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!isUser) {
      reply.code(401).send({ message: "credenciais inv\xE1lidas" });
    }
    const { id, name, cargo } = isUser;
    reply.code(200).send({ id, username, name, cargo });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ message: "Erro no Servidor" });
  }
};

// src/controllers/login.controller.ts
async function loginController(server2) {
  server2.post("/login", LoginService);
}

// src/routes/login.route.ts
async function loginRoutes(server2) {
  server2.register(loginController, { prefix: "auth" });
}

// src/server.ts
var server = (0, import_fastify.default)();
server.register(import_cors.default);
server.register(import_swagger.default, {});
server.register(import_fastify_api_reference.default, {
  routePrefix: "/docs",
  configuration: {
    theme: "kepler"
  }
});
server.get("/", (req, replay) => {
  replay.status(200).send({ message: "servidor ok" });
});
server.register(loginRoutes);
var PORT = Number(process.env.PORT) || 3e3;
server.listen({ port: PORT, host: "0.0.0.0" }).then((address) => {
  console.log(`\u{1F680} HTTP em ${address}`);
  console.log(`\u{1F4E1} WS em ${address.replace("http", "ws")}/ws`);
}).catch((err) => {
  console.error("Erro ao iniciar o servidor:", err);
  process.exit(1);
});
