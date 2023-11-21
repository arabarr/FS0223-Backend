const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pacienteController = require('../controllers/pacienteController'); // Importa el controlador
const router = express.Router();

// Ruta para obtener todos los pacientes
router.get('/', pacienteController.getAllPacientes);
router.get('/correo/:correo', pacienteController.getPacienteByCorreo);
router.post('/', pacienteController.crearPaciente);

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const paciente = await pacienteController.obtenerPacientePorCorreo(correo); // Usa la función del controlador

    if (!paciente || !bcrypt.compareSync(contraseña, paciente.contraseña)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ pacienteId: paciente._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Puedes ajustar la duración del token
    });

    // Almacenar información en la sesión
    req.session.pacienteId = paciente._id;

    res.cookie('token', token, { httpOnly: true });
    res.json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
  // Destruir la sesión
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.status(500).json({ error: 'Error al cerrar sesión' });
    } else {
      res.clearCookie('token');
      res.json({ mensaje: 'Cierre de sesión exitoso' });
    }
  });
});

module.exports = router;
