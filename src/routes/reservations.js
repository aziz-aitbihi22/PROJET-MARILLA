const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Créer une réservation
router.post('/', reservationController.createReservation);

// Voir ses réservations
router.get('/my', reservationController.getMyReservations);

// Admin : mettre à jour le statut
router.put('/:id/status', reservationController.updateReservationStatus);

module.exports = router;