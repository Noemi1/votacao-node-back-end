exports.up = function(knex) {
  return knex.schema.createTable('temas', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('descricao').notNullable();
    table.string('foto').notNullable();
    table.timestamp('dataCriacao').defaultTo(knex.fn.now());
    table.boolean('ativo').defaultTo(true);
    table.timestamp('dataInativo').nullable();
    table.string('ipInativacao').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('temas');
};