const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const ProjectController = require ('../controllers/projects');



// Get all projects
router.get('/', checkAuth, ProjectController.projects_get_all);

// Create project
router.post('/', checkAuth, ProjectController.projects_create_project);

// Get project by Id
router.get('/:projectId', checkAuth, ProjectController.projects_get_project);

// Update project by Id
router.put('/:projectId', checkAuth, ProjectController.projects_update_project);

// Delete project by Id
router.delete('/:projectId', checkAuth, ProjectController.projects_delete_project);

module.exports = router;