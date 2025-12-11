import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs"],
  sourcemap: false,
  clean: true,
  minify: false,
  dts: false,
  target: "es2020",
  shims: false,
});
