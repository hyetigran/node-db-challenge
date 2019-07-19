express = require("express");

const Projects = require("../models/project-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const project = await Projects.find();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to get projects" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to get project" });
  }
});

router.post("/", async (req, res) => {
  const newProject = req.body;
  try {
    const project = await Projects.add(newProject);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to add project" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.remove(req.params.id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: "Could not find project with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const project = await Projects.findById(id);

    if (project) {
      const updatedProject = await Projects.update(changes, id);
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Could not find project with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update project" });
  }
});

module.exports = router;
