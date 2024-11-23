import pg from "pg";
import { customers, drivers } from "../mockData";

console.log(process.env.DATABASE_URL);

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});

seedDatabase()
  .then(() => console.log("> Database seeded!"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => client.end());

async function seedDatabase() {
  console.log("\n> Seeding database...");

  await client.connect();

  await client.query("DELETE FROM drivers; DELETE FROM customers;");

  const driverQueries = drivers.map((driver) => {
    const {
      driver_id,
      name,
      description,
      vehicle,
      rating,
      comment,
      rate_per_km,
      min_distance,
      created_at,
    } = driver;

    return client.query({
      text: `INSERT INTO drivers (driver_id, name, description, vehicle, rating, comment, rate_per_km, min_distance, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
      values: [
        driver_id,
        name,
        description,
        vehicle,
        rating,
        comment,
        rate_per_km,
        min_distance,
        created_at,
      ],
    });
  });

  const customerQueries = customers.map((customer) => {
    const { customer_id, name, email, created_at } = customer;

    return client.query({
      text: `INSERT INTO customers (customer_id, name, email, created_at) VALUES ($1, $2, $3, $4) RETURNING *;`,
      values: [customer_id, name, email, created_at],
    });
  });

  await Promise.all([...driverQueries, ...customerQueries]);
}
