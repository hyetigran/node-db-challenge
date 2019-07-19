const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects").where({ id: Number(id) });
}

function add(recipe) {
  return db("projects")
    .insert(recipe)
    .then(ids => ({ id: ids[0] }));
}

function update(change, id) {
  return db("projects")
    .where("id", Number(id))
    .update(change);
}

function remove(id) {
  return db("projects")
    .where("id", Number(id))
    .del();
}
