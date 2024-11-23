import z from "zod";

export const estimateRideRequestSchema = z
  .object({
    customer_id: z.string().min(1),
    origin: z
      .string()
      .min(1)
      .transform((value) => value.toLocaleLowerCase().replaceAll(" ", "")),
    destination: z
      .string()
      .min(1)
      .transform((value) => value.toLocaleLowerCase().replaceAll(" ", "")),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination must be differents.",
    path: ["route"],
  });

export const estimateRideResponseSchema = {
  200: z.object({
    origin: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    destination: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    distance: z.number(),
    duration: z.string(),
    options: z.array(
      z.object({
        id: z.number().int(),
        name: z.string(),
        description: z.string(),
        vehicle: z.string(),
        review: z.object({
          rating: z.number(),
          comment: z.string(),
        }),
        value: z.number(),
      }),
    ),
    routeResponse: z.any(),
  }),
};
