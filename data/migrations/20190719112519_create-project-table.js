exports.up = function(knex) {
  return knex.schema.createTable("projects", table => {
    table.increments();
    table
      .text("name", 128)
      .unique()
      .notNullable();
    table.text("description").notNullable();
    table.boolean("isComplete").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects");
};
