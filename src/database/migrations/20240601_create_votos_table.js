exports.up = function(knex) {
  return knex.schema.createTable('votos', function(table) {
    table.increments('id').primary();
    table.integer('idTema').unsigned().references('id').inTable('temas');
    table.string('ip').notNullable();
    table.timestamp('dataHora').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('votos');
};