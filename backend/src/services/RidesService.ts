import { NotAcceptable, NotFound } from "../_errors";
import { fetchDirections } from "../lib/fetchGoogleMaps";
import { DriversRepository } from "../repositories/DriversRepository";
import { RidesRepository } from "../repositories/RidesRepository";

export class RidesService {
  private ridesRepository: RidesRepository;
  private driversRepository: DriversRepository;

  constructor() {
    this.ridesRepository = new RidesRepository();
    this.driversRepository = new DriversRepository();
  }

  async estimateRide(origin: string, destination: string) {
    const directions = await fetchDirections(origin, destination);

    const startLocation = directions.routes[0].legs[0].start_location;
    const endLocation = directions.routes[0].legs[0].end_location;
    const duration = directions.routes[0].legs[0].duration?.text as string;
    const distance = parseFloat(
      (directions.routes[0].legs[0].distance?.text as string).split(" ")[0],
    ); // get numeric value

    const drivers = await this.driversRepository.getDriversByDistance(distance);

    return {
      drivers: drivers.map((driver) => ({
        id: driver.driver_id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: parseFloat(driver.rating),
          comment: driver.comment,
        },
        value: +parseFloat(driver.value).toFixed(2),
      })),
      route: {
        startLocation,
        endLocation,
        duration,
        distance,
      },
      directions,
    };
  }

  async confirmRide(
    customer_id: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver_id: number,
    driver_name: string,
    value: number,
  ) {
    const findAvaiableDriver =
      await this.driversRepository.getDriverByIdAndName(driver_name, driver_id);

    if (findAvaiableDriver.rowCount === 0) {
      throw new NotFound("DRIVER_NOT_FOUND", "Motorista não encontrado");
    }

    console.log(findAvaiableDriver.rows);

    if (findAvaiableDriver.rows[0].min_distance > distance) {
      throw new NotAcceptable(
        "INVALID_DISTANCE",
        "Quilometragem inválida para o motorista",
      );
    }

    return this.ridesRepository.createRide(
      customer_id,
      driver_id,
      origin,
      destination,
      distance,
      duration,
      value,
    );
  }
}
