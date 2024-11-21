/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("customers", {
    customer_id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "varchar(100)",
      notNull: true,
    },
    email: {
      type: "varchar(200)",
      notNull: true,
      unique: true,
    },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
  pgm.createTable("drivers", {
    driver_id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "varchar(100)",
      notNull: true,
    },
    description: {
      type: "text",
      notNull: true,
    },
    vehicle: {
      type: "varchar(200)",
    },
    rating: {
      type: "numeric(2,1)",
      notNull: true,
      check: "rating >= 1 AND rating <= 5",
    },
    comment: {
      type: "text",
    },
    rate_per_km: {
      type: "numeric(10,2)",
      notNull: true,
    },
    min_distance: {
      type: "numeric(10,2)",
      notNull: true,
    },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
  pgm.createTable("rides", {
    ride_id: { type: "serial", primaryKey: true },
    customer_id: {
      type: "integer",
      references: "customers",
      onDelete: "cascade",
      notNull: true,
    },
    driver_id: {
      type: "integer",
      references: "drivers",
      onDelete: "set null",
      notNull: true,
    },
    origin: { type: "text", notNull: true },
    destination: { type: "text", notNull: true },
    distance: { type: "numeric(10,2)", notNull: true },
    duration: { type: "varchar(50)" },
    total_price: { type: "numeric(10,2)", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
