const mongoose = require('mongoose');

const connect = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectarse con la base de datos:", error);
    }
};

module.exports = { connect };
