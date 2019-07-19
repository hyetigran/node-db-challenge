express = require("express");

const Actions = require("../models/action-model");
const Projects = require("../models/project-model");

const router = express.Router();

router.get("/:id/actions", (req, res) => {
  const projectId = req.params.id;
  Projects.findById(projectId)
    .then(project => {
      //console.log("post", post);
      Actions.findProjectActions(project[0].id)
        .then(result => {
          // console.log("happy path");
          // console.log(result);
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(404).json({ errorMessage: "Can't find that id!" });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Can't find the action for this project" });
    });
});

router.post("/:id/actions", (req, res) => {
  const { params, body } = req;
  Projects.findById(params.id)
    .then(result => {
      //console.log(result[0].id);
      if (result[0].id > 0) {
        if (body.text) {
          const actionText = { ...body, post_id: params.id };
          Actions.insertAction(actionText)
            .then(result => {
              //console.log("happy path");
              //console.log(result);
              res.status(201).json(body);
            })
            .catch(err => {
              res.status(404).json({ errorMessage: "Can't find that id!" });
            });
        } else {
          res.status(400).json({
            errorMessage: "Please provide text for the action."
          });
        }
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Can't find this project" });
    });
});

module.exports = router;
