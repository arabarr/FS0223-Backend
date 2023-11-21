const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  correo: {
    type: String,
    unique: true,
    required: true,
  },
  dni: {
    type: String,
    unique: true,
    required: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Paciente', pacienteSchema);
