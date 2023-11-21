const Medico = require('../models/medico');
const { validationResult } = require('express-validator');

// Controlador para obtener todos los médicos
const getAllMedicos = async (req, res) => {
  try {
    const medicos = await Medico.find();
    res.json(medicos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los médicos' });
  }
};

// Controlador para obtener un médico por su ID
const getMedicoById = async (req, res) => {
  try {
    const medico = await Medico.findById(req.params.id);
    if (!medico) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }
    res.json(medico);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el médico' });
  }
};

// Controlador para crear un nuevo médico
const createMedico = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, especialidad, matricula } = req.body;
  
  try {
    const newMedico = new Medico({ nombre, especialidad, matricula });
    await newMedico.save();
    res.json(newMedico);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el médico' });
  }
};

// Controlador para actualizar un médico por su ID
const updateMedico = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, especialidad } = req.body;
  
  try {
    const medico = await Medico.findByIdAndUpdate(req.params.id, { nombre, especialidad }, { new: true });
    if (!medico) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }
    res.json(medico);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el médico' });
  }
};

// Controlador para eliminar un médico por su ID
const deleteMedico = async (req, res) => {
  try {
    const medico = await Medico.findByIdAndDelete(req.params.id);
    if (!medico) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }
    res.json({ message: 'Médico eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el médico' });
  }
};

// Controlador para buscar médicos por nombre
const buscarMedicoPorNombre = async (req, res) => {
  let nombre = req.params.nombre;

  // Reemplazamos los espacios en blanco con expresiones adecuadas
  nombre = nombre.replace(/%20/g, ' ');

  try {
    const medicosEncontrados = await Medico.find({ nombre: { $regex: new RegExp(`^${nombre}$`, 'i') } });

    if (medicosEncontrados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron médicos con ese nombre.' });
    }

    res.json(medicosEncontrados);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el médico por nombre.' });
  }
};


module.exports = {
  getAllMedicos,
  getMedicoById,
  createMedico,
  updateMedico,
  deleteMedico,
  buscarMedicoPorNombre,
};
