import { FastifyReply, FastifyRequest } from "fastify";
import { RidesService } from "../services/RidesService";
import { ConfirmRequestBody, EstimateRequestBody } from "../types/apiRequests";

export class RidesController {
  private ridesService: RidesService;

  constructor() {
    this.ridesService = new RidesService();
  }

  async estimateRide(
    request: FastifyRequest<{ Body: EstimateRequestBody }>,
    reply: FastifyReply,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customer_id, origin, destination } = request.body;

    const newEstimateRide = await this.ridesService.estimateRide(
      origin,
      destination,
    );

    return reply.status(200).send({
      origin: {
        latitude: newEstimateRide.route.startLocation.lat,
        longitude: newEstimateRide.route.startLocation.lng,
      },
      destination: {
        latitude: newEstimateRide.route.endLocation.lat,
        longitude: newEstimateRide.route.endLocation.lng,
      },
      distance: newEstimateRide.route.distance,
      duration: newEstimateRide.route.duration,
      options: newEstimateRide.drivers,
      routeResponse: newEstimateRide.directions,
    });
  }

  async confirmRide(
    request: FastifyRequest<{ Body: ConfirmRequestBody }>,
    reply: FastifyReply,
  ) {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = request.body;

    await this.ridesService.confirmRide(
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver.id,
      driver.name,
      value,
    );

    return reply.status(200).send({
      success: true,
    });
  }
}
