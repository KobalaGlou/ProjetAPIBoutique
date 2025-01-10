const express = require('express');
const router = express.Router();
const ballonController = require('../controllers/ballonsController');

// Obtenir tous les ballons
router.get('/', ballonController.getAllBallons);

// Obtenir un ballon par ID
router.get('/:id', ballonController.getBallonById);

// Créer un ballon (admin uniquement)
router.post('/', ballonController.createBallon);

// Mettre à jour un ballon (admin uniquement)
router.put('/:id', ballonController.updateBallon);

// Supprimer un ballon (admin uniquement)
router.delete('/:id', ballonController.deleteBallon);

module.exports = router;
