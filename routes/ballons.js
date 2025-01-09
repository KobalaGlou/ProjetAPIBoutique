const express = require('express');
const router = express.Router();
const { getAllBallons } = require('../controllers/ballonsController');

const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, getAllBallons);

module.exports = router;
