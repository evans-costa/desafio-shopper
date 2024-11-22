import z from "zod";

export const confirmRideRequestSchema = z
  .object({
    customer_id: z.string().min(1),
    origin: z.string().min(1),
    destination: z.string().min(1),
    distance: z.number().positive(),
    duration: z.string().min(1),
    driver: z.object({
      id: z.number().positive(),
      name: z.string().min(1),
    }),
    value: z.number().positive(),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination must be differents.",
    path: ["route"],
  });

export const confirmRideResponseSchema = {
  200: z.object({
    success: z.boolean(),
  }),
};
