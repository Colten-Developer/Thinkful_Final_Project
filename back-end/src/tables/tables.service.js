const knex = require('../db/connection')

//get tables
function list() {
    return knex('tables').select('*').orderBy('table_name')
}

//get tables/:tablesId
function read(tableId) {
    return knex('tables').select('*').where({ 'table_id': tableId }).first()
}

//read reservation id
function readReservation(reservationId) {
    return knex('reservations')
      .select('*')
      .where({ 'reservation_id': reservationId })
      .first()
}

//post tables
function create(table) {
    return knex('tables').insert(table).returning('*')
}

//put tables/:tableId/seat
function update(updatedTable) {
    return knex('tables')
        .select('*')
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, '*')
  }

module.exports = {
    list,
    read,
    create,
    update,
    readReservation,
}