const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: Date,
    checkOut: Date,
    status: { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' }
});

reservationSchema.statics.findOverlap = async function(roomId, checkIn, checkOut) {
    return await this.findOne({
        roomId,
        status: { $ne: 'cancelled' },
        $or: [
            { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
            { checkOut: { $lte: new Date(checkOut), $gt: new Date(checkIn) } },
            { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } }
        ]
    });
};

reservationSchema.statics.findByUser = async function(userId) {
    return await this.find({ userId });
};

reservationSchema.statics.updateStatus = async function(reservationId, status) {
    return await this.findByIdAndUpdate(reservationId, { status }, { new: true });
};

module.exports = mongoose.model('Reservation', reservationSchema);