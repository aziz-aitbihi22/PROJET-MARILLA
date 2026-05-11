const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "L'utilisateur est obligatoire"]
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, "La chambre est obligatoire"]
    },
    checkIn: {
        type: Date,
        required: [true, "La date d'arrivée est obligatoire"]
    },
    checkOut: {
        type: Date,
        required: [true, "La date de départ est obligatoire"]
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    },
    totalPrice: {
        type: Number,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
