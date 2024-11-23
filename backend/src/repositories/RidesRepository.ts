import database from "../infra/database";

export class RidesRepository {
  async createRide(
    customer_id: string,
    driver_id: number,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    value: number,
  ) {
    const query = {
      text: `INSERT INTO rides (customer_id, driver_id, origin, destination, distance, duration, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      values: [
        customer_id,
        driver_id,
        origin,
        destination,
        distance,
        duration,
        value,
      ],
    };

    const result = await database.query(query);

    return result.rows[0];
  }

  async getRidesByCustomerAndDriver(
    customer_id: string,
    driver_id?: number | null,
  ) {
    const query = {
      text: `SELECT * FROM rides r 
        INNER JOIN 
          customers c ON r.customer_id = c.customer_id
        INNER JOIN 
          drivers d ON r.driver_id = d.driver_id
        WHERE 
          c.customer_id = $1
          AND ($2::INT IS NULL OR d.driver_id = $2);
      `,
      values: [customer_id, driver_id || null],
    };

    const result = await database.query(query);

    return result.rows;
  }
}
