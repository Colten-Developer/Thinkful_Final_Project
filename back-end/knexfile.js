/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://owrfhxts:viDF8-uVXlvKFxvNg1EIOeYxkiteq3fA@batyr.db.elephantsql.com/owrfhxts",
  DATABASE_URL_DEVELOPMENT = "postgres://rloktkyy:7aqs1sfDeV643WIALzJJ7rsvsef89Sn3@batyr.db.elephantsql.com/rloktkyy",
  DATABASE_URL_TEST = "postgres://hymzeigm:ROZRrhhf-9jMoTJ2xcNhKO3lEuP2H9eI@batyr.db.elephantsql.com/hymzeigm",
  DATABASE_URL_PREVIEW = "postgres://duatbosp:4k6SxF3MxyxDAD7unecp9LczC1ayCleq@batyr.db.elephantsql.com/duatbosp",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
