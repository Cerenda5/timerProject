const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const GroupController = require ('../controllers/groups')

// Get all groups
router.get('/', checkAuth, GroupController.groups_get_all);

// Create group
router.post('/', checkAuth , GroupController.groups_create_group);

// Get group by Id
router.get('/:groupId',checkAuth, GroupController.groups_get_group);

// Update group by Id
router.put('/:groupId', checkAuth , GroupController.groups_update_group);

// Delete group by Id
router.delete('/:groupId', checkAuth, GroupController.groups_delete_group);

module.exports = router;