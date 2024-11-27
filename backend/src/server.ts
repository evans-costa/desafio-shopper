import fastify from "fastify";
import { ridesRoutes } from "./routes/rideRoutes";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import { errorHandler } from "./errorHandler";

export const server = fastify();
server.register(fastifyCors, {
  origin: "*",
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(ridesRoutes);

server.setErrorHandler(errorHandler);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
