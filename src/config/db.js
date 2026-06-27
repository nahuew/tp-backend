import mongoose from "mongoose";

export const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log('✅ Conectado a Mongo Local:', mongoose.connection.name);
    } catch (error) {
        console.error('Error conexión Mongo:', error.message);
        process.exit(1);
    }
};

