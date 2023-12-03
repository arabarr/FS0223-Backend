
const express = require('express');
const { body, param } = require('express-validator');
const reservaController = require('../controllers/reservaController');
const validatorMiddleware = require('../middleware/validatorMiddleware');

const router = express.Router();

// Ruta para obtener todas las reservas
router.get('/', reservaController.getAllReservas);
router.get('/', validatorMiddleware.validateToken, reservaController.getAllReservas);

// Obtener una reserva por su ID
router.get('/:id', [
  param('id').isMongoId().withMessage('ID de reserva no válido'),
], validatorMiddleware.validateFields, reservaController.getReservaById);

// Crear una nueva reserva
router.post('/', [
  body('fecha').isISO8601().withMessage('La fecha de la reserva debe estar en formato ISO8601'),
  body('pacienteNombre').notEmpty().withMessage('El nombre del paciente es obligatorio'),
  body('medicoId').isMongoId().withMessage('ID de médico no válido'),
], validatorMiddleware.validateFields, reservaController.createReserva);

// Actualizar una reserva por su ID
router.put('/:id', [
  param('id').isMongoId().withMessage('ID de reserva no válido'),
  body('fecha').isISO8601().withMessage('La fecha de la reserva debe estar en formato ISO8601'),
  body('pacienteNombre').notEmpty().withMessage('El nombre del paciente es obligatorio'),
  body('medicoId').isMongoId().withMessage('ID de médico no válido'),
], validatorMiddleware.validateUpdateMedico, reservaController.updateReserva);

// Eliminar una reserva por su ID
router.delete('/:id', [
  param('id').isMongoId().withMessage('ID de reserva no válido'),
], validatorMiddleware.validateFields, reservaController.deleteReserva);

module.exports = router;

