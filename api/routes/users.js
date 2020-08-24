const express = require('express');
const router = express.Router();

const UserController = require ('../controllers/users');


// Create new user
router.post('/signup', UserController.user_signup);

// Get all Users
router.get('/', UserController.users_get_all);

// Get user by ID
router.get('/:userId', UserController.users_get_user);

// Login
router.post('/login', UserController.users_login);

// Update user by ID
router.put('/:userId', UserController.users_update_user);

//Delete user by Id
router.delete('/:userId',UserController.users_delete_user);

module.exports = router;