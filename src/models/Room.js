const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: [true, "Le numéro de chambre est obligatoire"],
        unique: true, 
        trim: true
    },
    type: {
        type: String,
        required: [true, "Le type de chambre est obligatoire"],
        enum: ['Single', 'Double', 'Suite', 'Deluxe'] 
    },
    price: {
        type: Number,
        required: [true, "Le prix est obligatoire"],
        min: [0, "Le prix ne peut pas être négatif"] 
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    description: String,
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);