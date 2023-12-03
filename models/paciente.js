const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    select: false, // Para asegurar que la contraseña no sea devuelta en las consultas
  },
});

// Antes de guardar la contraseña, realizar hashing con bcrypt
pacienteSchema.pre('save', async function (next) {
  const paciente = this;
  if (!paciente.isModified('contraseña')) return next();

  const hash = await bcrypt.hash(paciente.contraseña, 10);
  paciente.contraseña = hash;
  next();
});

module.exports = mongoose.model('Paciente', pacienteSchema);
