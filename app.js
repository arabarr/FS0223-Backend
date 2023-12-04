const express = require('express');
const session = require('express-session');
const MongoDBStore = require ('connect-mongodb-session')(session)
const cors = require('cors');
const dotenv = require('dotenv');
const medicoRoutes = require('./routes/medicoRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const { connect } = require('./db/connect');

dotenv.config();
const app = express();

// Configuración de la conexión a MongoDB para almacenar las sesiones
const store = new MongoDBStore({
  uri: process.env.MONGO_URL, // Utiliza la misma conexión a MongoDB
  collection: 'sessions', // Nombre de la colección para las sesiones
});

store.on('error', (error) => {
  console.error('Error en el almacenamiento de sesiones:', error);
});

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store, 
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Conexión a la base de datos y rutas principales
connect()
  .then(() => {
    // Rutas principales
    app.use('/medicos', medicoRoutes);
    app.use('/reservas', reservaRoutes);
    app.use('/pacientes', pacienteRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Sale de la aplicación si hay un error en la conexión
  });

//Get
app.get('/',(req, res) => {
  res.send('Hola, bienvenido!')
})

module.exports = app; 


