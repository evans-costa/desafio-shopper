import z from "zod";
import { estimateRideRequestSchema } from "../schemas/estimateRideSchema";
import { confirmRideRequestSchema } from "../schemas/confirmRideSchema";

export type EstimateRequestBody = z.infer<typeof estimateRideRequestSchema>;
export type ConfirmRequestBody = z.infer<typeof confirmRideRequestSchema>;
