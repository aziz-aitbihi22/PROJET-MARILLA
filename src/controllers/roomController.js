const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Chambre supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllRooms = async (req, res) => {
    try {
        const { minPrice, maxPrice, type, available } = req.query;
        let query = {};

        if (type) query.type = type;
        if (available === 'true') query.isAvailable = true;
        if (available === 'false') query.isAvailable = false;

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const rooms = await Room.find(query);
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};