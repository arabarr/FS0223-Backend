const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_MONGODB);
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectarse con la base de datos:", error);
        // Puedes lanzar el error si lo deseas para manejarlo desde fuera
        // throw new Error("Error al conectarse con la base de datos");
    }
};

module.exports = { connect };
