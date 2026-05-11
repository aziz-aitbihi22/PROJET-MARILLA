const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

// POST /api/reservations — Create a new reservation
exports.createReservation = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut } = req.body;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Chambre introuvable" });
        if (!room.isAvailable) return res.status(400).json({ message: "Chambre non disponible" });

        // Calculate total price based on number of nights
        const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
        if (nights <= 0) return res.status(400).json({ message: "Les dates sont invalides" });

        const totalPrice = nights * room.price;

        // Check for date collisions
        const overlappingReservations = await Reservation.find({
            room: roomId,
            status: 'confirmed',
            $or: [
                { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
            ]
        });

        if (overlappingReservations.length > 0) {
            return res.status(400).json({ message: "Ces dates sont déjà réservées." });
        }

        const reservation = await Reservation.create({
            user: req.user._id,
            room: roomId,
            checkIn,
            checkOut,
            totalPrice,
            status: 'confirmed'
        });

        const populated = await Reservation.findById(reservation._id)
            .populate('room', 'roomNumber type price description');

        res.status(201).json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/reservations/my — Get logged-in user's reservations
exports.getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id })
            .populate('room', 'roomNumber type price description')
            .sort({ createdAt: -1 });

        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/reservations/:id/cancel — Cancel a reservation
exports.cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) return res.status(404).json({ message: "Réservation introuvable" });
        if (reservation.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Non autorisé" });
        }
        if (reservation.status === 'cancelled') {
            return res.status(400).json({ message: "Réservation déjà annulée" });
        }

        reservation.status = 'cancelled';
        await reservation.save();

        // Mark room as available again
        await Room.findByIdAndUpdate(reservation.room, { isAvailable: true });

        const populated = await Reservation.findById(reservation._id)
            .populate('room', 'roomNumber type price description');

        res.status(200).json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/reservations/room/:roomId — Get active reservations for a room
exports.getRoomReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ 
            room: req.params.roomId,
            status: 'confirmed'
        }).select('checkIn checkOut');

        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
