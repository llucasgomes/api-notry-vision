import { buildServer } from "../src/server";

const server = buildServer();

export default async function handler(req: any, res: any) {
  await server.ready();
  server.server.emit("request", req, res);
}
