const knex = require('../db/connection')

function create(reservation) {
    return knex("reservations").insert(reservation).returning("*");
  }

  function list() {
    return knex("reservations").select("*");
  }

function listDate(date) {
    return knex('reservations')
    .select('*')
    .where({ 'reservation_date': date })
}

module.exports = {
    create,
    list,
    listDate,
}