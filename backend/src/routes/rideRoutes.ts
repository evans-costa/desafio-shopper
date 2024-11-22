import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RidesController } from "../controllers/RidesController";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  estimateRideRequestSchema,
  estimateRideResponseSchema,
} from "../schemas/estimateRideSchema";
import z from "zod";
import { ConfirmRequestBody, EstimateRequestBody } from "../types/apiRequests";
import {
  confirmRideRequestSchema,
  confirmRideResponseSchema,
} from "../schemas/confirmRideSchema";

export async function ridesRoutes(app: FastifyInstance) {
  const ridesController = new RidesController();

  app.withTypeProvider<ZodTypeProvider>().post(
    "/ride/estimate",
    {
      schema: {
        body: estimateRideRequestSchema,
        response: estimateRideResponseSchema,
        400: z.object({
          error_code: z.string(),
          error_description: z.string(),
        }),
      },
    },
    async (
      request: FastifyRequest<{ Body: EstimateRequestBody }>,
      reply: FastifyReply,
    ) => ridesController.estimateRide(request, reply),
  );

  app.withTypeProvider<ZodTypeProvider>().patch(
    "/ride/confirm",
    {
      schema: {
        body: confirmRideRequestSchema,
        response: confirmRideResponseSchema,
        400: z.object({
          error_code: z.string(),
          error_description: z.string(),
        }),
        404: z.object({
          error_code: z.string(),
          error_description: z.string(),
        }),
        406: z.object({
          error_code: z.string(),
          error_description: z.string(),
        }),
      },
    },
    async (
      request: FastifyRequest<{ Body: ConfirmRequestBody }>,
      reply: FastifyReply,
    ) => ridesController.confirmRide(request, reply),
  );
}
