import database from "../database";

async function seedDatabase() {
  console.log("\n> Seeding database...");

  const deleteBeforeSeed = `DELETE FROM drivers; DELETE FROM customers; DELETE FROM rides;`;
  await database.query(deleteBeforeSeed);

  const drivers = [
    {
      driver_id: 1,
      name: "Homer Simpson",
      description:
        "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
      rating: 2,
      comment:
        "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
      rate_per_km: 2.5,
      min_distance: 1,
      created_at: new Date(),
    },
    {
      driver_id: 2,
      name: "Dominic Toretto",
      description:
        "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      vehicle: "Dodge Charger R/T 1970 modificado",
      rating: 4,
      comment:
        "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
      rate_per_km: 5.0,
      min_distance: 5,
      created_at: new Date(),
    },
    {
      driver_id: 3,
      name: "James Bond",
      description:
        "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      vehicle: "Aston Martin DB5 clássico",
      rating: 5,
      comment:
        "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
      rate_per_km: 10.0,
      min_distance: 10,
      created_at: new Date(),
    },
  ];

  const customers = [
    {
      customer_id: 1,
      name: "John Dee",
      email: "johndee@email.com",
      created_at: new Date(),
    },
    {
      customer_id: 2,
      name: "Mary Lee",
      email: "marylee@email.com",
      created_at: new Date(),
    },
    {
      customer_id: 3,
      name: "Peter Doo",
      email: "peterdoo@email.com",
      created_at: new Date(),
    },
  ];

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

    return database.query({
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

    return database.query({
      text: `INSERT INTO customers (customer_id, name, email, created_at) VALUES ($1, $2, $3, $4) RETURNING *;`,
      values: [customer_id, name, email, created_at],
    });
  });

  await Promise.all([...driverQueries, ...customerQueries]);
}

seedDatabase()
  .then(() => console.log("> Database seeded!"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
