const express = require('express');
const { body, param } = require('express-validator');
const medicoController = require('../controllers/medicoController');
const validatorMiddleware = require('../middleware/validatorMiddleware');

const router = express.Router();

// Obtener todos los médicos
router.get('/', medicoController.getAllMedicos);
router.get('/buscar/:nombre', medicoController.buscarMedicoPorNombre);

// Obtener un médico por su ID
router.get('/:id', [
  param('id').isMongoId().withMessage('ID de médico no válido'),
], validatorMiddleware.validateCreateMedico, medicoController.getMedicoById);

// Crear un nuevo médico
router.post('/', [
  body('nombre').notEmpty().withMessage('El nombre del médico es obligatorio'),
  body('especialidad').notEmpty().withMessage('La especialidad del médico es obligatoria'),
], validatorMiddleware.validateCreateMedico, medicoController.createMedico);

// Actualizar un médico por su ID
router.put('/:id', [
  param('id').isMongoId().withMessage('ID de médico no válido'),
  body('nombre').notEmpty().withMessage('El nombre del médico es obligatorio'),
  body('especialidad').notEmpty().withMessage('La especialidad del médico es obligatoria'),
],  validatorMiddleware.validateUpdateMedico, medicoController.updateMedico);

// Eliminar un médico por su ID
router.delete('/:id', [
  param('id').isMongoId().withMessage('ID de médico no válido'),
], validatorMiddleware.validateCreateMedico, medicoController.deleteMedico);

module.exports = router;


