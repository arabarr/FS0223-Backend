const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  especialidad: {
    type: String,
    required: true,
  },
  matricula:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Medico', medicoSchema);
