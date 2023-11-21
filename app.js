const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const medicoRoutes = require('./routes/medicoRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const { connect } = require('./db/connect');

dotenv.config();
const app = express();

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // Se recomienda usar una clave secreta desde las variables de entorno
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Configuración de la cookie (ajusta según tus necesidades)
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
  });

module.exports = app; // Exportar la app si necesitas usarla en otros archivos


