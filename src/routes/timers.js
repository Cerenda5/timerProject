const express = require('express');
const router = express.Router();

const TimerController = require ('../controllers/timers')

// Get all timers
router.get('/', TimerController.timers_get_all);

// Create timer
router.post('/', TimerController.timers_create_timer);

// Get timer by Id
router.get('/:timerId', TimerController.timers_get_timer);

// Update timer by Id
router.put('/:timerId', TimerController.timers_update_timer);

// Delete timer by Id
router.delete('/:timerId', TimerController.timers_delete_timer);

module.exports = router;