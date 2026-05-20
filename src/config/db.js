const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
            //serverSelectionTimeoutMS: 15000,
            //family: 4  // Forzar IPV4 POR ERROR DE CONEXION A MONGO ATLAS. --> Habilitar cuando se haga la conexion a Mongo Atlas.
        console.log('✅ Conectado a Mongo Local:', mongoose.connection.name);
    } catch (error) {
        console.log('❌ Error conexión Mongo:', error.message);
    }
};

module.exports = connectDB;




