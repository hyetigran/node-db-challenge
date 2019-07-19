exports.up = function(knex) {
  return knex.schema.createTable("actions", table => {
    table.increments();
    table.text("description").notNullable();
    table.text("notes");
    table.boolean("isComplete").notNullable();
    table
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("project");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("actions");
};
