const express = require("express");

const projectRouter = require("./routes/project-router");
const actionRouter = require("./routes/action-router");
const server = express();

server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/projects", actionRouter);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
