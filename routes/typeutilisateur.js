const express = require('express');
const router = express.Router();
const TypeUtilisateurController = require('../controllers/typeutilisateurController');

router.get('/', TypeUtilisateurController.getAllTypeUtilisateurs);
router.get('/:id', TypeUtilisateurController.getTypeUtilisateurById);
router.post('/', TypeUtilisateurController.createTypeUtilisateur);
router.put('/:id', TypeUtilisateurController.updateTypeUtilisateur);
router.delete('/:id', TypeUtilisateurController.deleteTypeUtilisateur);

module.exports = router;
