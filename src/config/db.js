const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000,
            family: 4  // Forzar IPV4 POR ERROR DE CONEXION A MONGO ATLAS.
        });
        console.log('✅ Conectado a Mongo Atlas:', mongoose.connection.name);
    } catch (error) {
        console.log('❌ Error conexión Mongo:', error.message);
    }
};

module.exports = connectDB;