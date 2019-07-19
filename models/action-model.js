const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  findProjectActions,
  findActionById,
  insertAction
};

function findProjectActions(projectId) {
  return db("actions")
    .join("projects", "projects.id", "project_id")
    .select("actions.*")
    .where("project_id", projectId);
}

function findActionById(id) {
  return db("actions")
    .join("projects", "projects.id", "project_id")
    .select("actions.*")
    .where("actions.id", id);
}

function insertAction(action) {
  return db("actions")
    .insert(action)
    .then(ids => ({ id: ids[0] }));
}
