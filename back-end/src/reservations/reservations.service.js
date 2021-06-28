const knex = require('../db/connection')

function create(reservation) {
    return knex("reservations").insert(reservation).returning("*");
  }

  function list() {
    return knex("reservations").select("*").orderBy('reservation_time');
  }

  function read(reservationId) {
    return knex('reservations')
      .select('*')
      .where({ 'reservation_id': reservationId })
      .first()
}

function listDate(date) {
    return knex('reservations')
    .select('*')
    .where({ 'reservation_date': date })
    .orderBy('reservation_time')
}

module.exports = {
    create,
    list,
    listDate,
    read,
}