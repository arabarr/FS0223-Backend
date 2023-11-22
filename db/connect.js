const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectarse con la base de datos:", error);
    }
};

module.exports = { connect };
