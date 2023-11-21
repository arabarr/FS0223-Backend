const { body, param, validationResult } = require('express-validator');

// Middleware para validar campos
const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validadores para la ruta de creación de un nuevo médico
const validateCreateMedico = [
  body('nombre').notEmpty().withMessage('El nombre del médico es obligatorio'),
  body('especialidad').notEmpty().withMessage('La especialidad del médico es obligatoria'),
  validateFields,
];

// Validadores para la ruta de actualización de un médico por su ID
const validateUpdateMedico = [
  param('id').isMongoId().withMessage('ID de médico no válido'),
  body('nombre').notEmpty().withMessage('El nombre del médico es obligatorio'),
  body('especialidad').notEmpty().withMessage('La especialidad del médico es obligatoria'),
  validateFields,
];

// Agrega más validadores para otras rutas según sea necesario
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.pacienteId = decoded.pacienteId;
    next();
  });
};

module.exports = {
  validateFields,
  validateCreateMedico,
  validateUpdateMedico,
  validateToken,
};

