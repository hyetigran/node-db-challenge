const express = require("express");

const projectRouter = require("./projects/project-router");
const server = express();

server.use(express.json());

server.use("/api/projects", projectRouter);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
