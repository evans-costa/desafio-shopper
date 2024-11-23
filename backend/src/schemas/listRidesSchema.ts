import z from "zod";

export const listRidesResponseSchema = {
  200: z.object({
    customer_id: z.string(),
    rides: z.array(
      z.object({
        id: z.number(),
        date: z.date(),
        origin: z.string(),
        destination: z.string(),
        duration: z.string(),
        driver: z.object({
          id: z.number(),
          name: z.string(),
        }),
        value: z.number(),
      }),
    ),
  }),
};
