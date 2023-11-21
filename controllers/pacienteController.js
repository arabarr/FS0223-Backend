const Paciente = require('../models/paciente'); // Importa el modelo de paciente.js

// Controlador para crear un nuevo paciente
const crearPaciente = async (req, res) => {
  try {
    const { correo, dni, contraseña } = req.body;
    const nuevoPaciente = new Paciente({ correo, dni, contraseña });
    await nuevoPaciente.save();

    res.json({ mensaje: 'Paciente creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el paciente' });
  }
};

// Controlador para obtener todos los pacientes
const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pacientes' });
  }
};

// Controlador para obtener un paciente por su correo
const getPacienteByCorreo = async (req, res) => {
  try {
    const { correo } = req.params; // Obtener el correo del parámetro en la URL
    const paciente = await Paciente.findOne({ correo }); // Buscar el paciente por el correo en la base de datos

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json(paciente); // Enviar el paciente encontrado como respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el paciente' });
  }
};

module.exports = {
  crearPaciente,
  getAllPacientes,
  getPacienteByCorreo,
};
