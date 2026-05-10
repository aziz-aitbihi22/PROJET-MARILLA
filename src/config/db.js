const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marilla_db');
        console.log("MongoDB Connecté ✅");
    } catch (err) {
        console.error("Erreur connexion MongoDB ❌", err);
        process.exit(1);
    }
};

module.exports = connectDB;