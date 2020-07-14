module.exports = app => {
  const project = require("../controllers/project.controller.js");
  
  var router = require("express").Router();
  
  // Create a new Project
  router.post("/", project.create);
  
  // Retrieve all Projects
  router.get("/", project.findAll);
  
  // Retrieve a single Project with id
  router.get("/:id", project.findOne);
  
  // Update a Project with id
  router.put("/:id", project.update);
  
  // Delete a Project with id
  router.delete("/:id", project.delete);
  
  app.use('/api/projects', router);
  };