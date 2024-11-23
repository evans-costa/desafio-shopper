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
import { listRidesResponseSchema } from "../schemas/listRidesSchema";

export async function ridesRoutes(app: FastifyInstance) {
  const ridesController = new RidesController();

  app.withTypeProvider<ZodTypeProvider>().get(
    "/ride/:customer_id",
    {
      schema: {
        params: z.object({
          customer_id: z.string().min(1),
        }),
        querystring: z.object({
          driver_id: z.string().nullish(),
        }),
        response: listRidesResponseSchema,
        400: z.object({
          error_code: z.string(),
          error_description: z.string(),
        }),
        404: z.object({
          error_code: z.string(),
          error_description: z.string(),
        }),
      },
    },
    async (
      request: FastifyRequest<{
        Params: { customer_id: string };
        Querystring: { driver_id: number };
      }>,
      reply: FastifyReply,
    ) => ridesController.listRides(request, reply),
  );

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
