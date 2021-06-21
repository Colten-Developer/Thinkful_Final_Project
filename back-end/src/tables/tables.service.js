const knex = require('../db/connection')

//get tables/:tableId
//post tables
//get tables
//get reservations/:reservationId
//put /tables/:tableId/seat

//get tables
function list() {
    return knex('tables').select('*')
}

//get tables/:tablesId
function read(tableId) {
    return knex('tables').select('*').where({ tableId }).first()
}

//post tables
function create(table) {
    return knex('tables').insert(table).returning('*')
}

//put tables/:tableId/seat
function updateSeat(updatedTable) {
    return knex('tables')
        .select('*')
        .where({ table_id: updatedTable.tableId})
        .update(updatedTable, '*')
}

module.exports = {
    list,
    read,
    create,
    updateSeat,
}