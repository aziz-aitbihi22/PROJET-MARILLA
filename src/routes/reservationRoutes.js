const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    createReservation,
    getMyReservations,
    cancelReservation,
    getRoomReservations
} = require('../controllers/reservationController');

// All reservation routes require authentication
router.post('/', protect, createReservation);
router.get('/my', protect, getMyReservations);
router.put('/:id/cancel', protect, cancelReservation);

// Public route to get booked dates for a room
router.get('/room/:roomId', getRoomReservations);

module.exports = router;
