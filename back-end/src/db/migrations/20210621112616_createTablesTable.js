
exports.up = function(knex) {
  return knex.schema.createTable("tables", (table) => {
      table.increments("table_id").primary;
      table.string("table_name");
      table.integer("capacity");
      table
        .foreign("reservation_id")
        .references("reservation_id")
        .inTable("reservations")
        .onDelete("CASCADE");
      table.timestamp(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tables")
};
