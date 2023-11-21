const Reserva = require('../models/reserva');
const { validationResult } = require('express-validator');

// Controlador para obtener todas las reservas
const getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};


// Controlador para obtener una reserva por su ID
const getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('medicoId');
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
};

// Controlador para crear una nueva reserva
const createReserva = async (req, res) => {
  try {
    const { fecha, pacienteNombre, medicoId  } = req.body;
    const newReserva = new Reserva({ fecha, pacienteNombre, medicoId });
    await newReserva.save();
    res.json(newReserva);
  } catch (error) {
    console.error('Error al crear la reserva:', error); 
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

// Controlador para actualizar una reserva por su ID
const updateReserva = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fecha, pacienteNombre, medicoId } = req.body;
  
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, { fecha, pacienteNombre, medicoId }, { new: true }).populate('medicoId');
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

// Controlador para eliminar una reserva por su ID
const deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id).populate('medicoId');
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};

module.exports = {
  getAllReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
};
