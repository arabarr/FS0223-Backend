const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  pacienteNombre: {
    type: String,
    required: true,
  },
  medicoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medico',
    required: true,
  },
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
