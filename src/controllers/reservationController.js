const Reservation = require('../models/reservationModel');
const { checkDatesValid } = require('../utils/helpers');

// POST /reservations
exports.createReservation = async (req, res) => {
    const { userId, roomId, checkIn, checkOut } = req.body;

    // Vérification checkOut > checkIn
    if (!checkDatesValid(checkIn, checkOut)) {
        return res.status(400).json({ error: "checkOut doit être après checkIn" });
    }

    // Vérification chevauchements
    const conflict = await Reservation.findOverlap(roomId, checkIn, checkOut);
    if (conflict) {
        return res.status(400).json({ error: "Dates déjà réservées pour cette chambre" });
    }

    const reservation = await Reservation.create({ userId, roomId, checkIn, checkOut, status: 'pending' });
    res.json({ success: true, reservation });
};

// GET /reservations/my
exports.getMyReservations = async (req, res) => {
    const userId = req.user.id; // ou depuis req.body si pas d'auth
    const reservations = await Reservation.findByUser(userId);
    res.json(reservations);
};

// PUT /reservations/:id/status
exports.updateReservationStatus = async (req, res) => {
    const reservationId = req.params.id;
    const { status } = req.body;
    const user = req.user; // l'utilisateur courant

    if (!user.isAdmin) {
        return res.status(403).json({ error: "Seul l'admin peut modifier le statut" });
    }

    if (!['confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ error: "Statut invalide" });
    }

    await Reservation.updateStatus(reservationId, status);
    res.json({ success: true });
};