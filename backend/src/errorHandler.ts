import { FastifyInstance } from "fastify";
import { BadRequest, NotAcceptable, NotFound } from "./_errors";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }

  if (error instanceof BadRequest) {
    return reply.status(error.statusCode).send({
      error_code: error.error_code,
      error_description: error.error_description,
    });
  }

  if (error instanceof NotFound) {
    return reply.status(error.statusCode).send({
      error_code: error.error_code,
      error_description: error.error_description,
    });
  }

  if (error instanceof NotAcceptable) {
    return reply.status(error.statusCode).send({
      error_code: error.error_code,
      error_description: error.error_description,
    });
  }

  return reply.status(500).send({ message: "Internal Server Error" });
};
