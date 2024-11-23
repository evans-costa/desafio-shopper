import database from "../infra/database";

export class DriversRepository {
  async getDriversByDistance(distance: number) {
    const query = {
      text: `SELECT 
      driver_id, name, description, vehicle, rating, comment, rate_per_km, ROUND(rate_per_km * $1, 2) AS value 
      FROM 
        drivers 
      WHERE 
        min_distance <= $1
      ORDER BY
        value ASC;
      `,
      values: [distance],
    };

    const result = await database.query(query);

    return result.rows;
  }

  async getDriverByIdAndName(name: string, id: number) {
    const query = {
      text: `SELECT *
      FROM
        drivers
      WHERE 
        name = $1 AND driver_id = $2;
      `,
      values: [name, id],
    };

    const result = await database.query(query);

    return result;
  }

  async getDriverById(id: number) {
    const query = {
      text: `SELECT *
      FROM
        drivers
      WHERE 
        driver_id = $1;
      `,
      values: [id],
    };

    const result = await database.query(query);

    return result;
  }
}
