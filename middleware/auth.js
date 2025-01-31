const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error("❌ ERREUR : JWT_SECRET n'est pas défini dans le fichier .env !");
    process.exit(1);
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader); // Optionnel, à garder pour le debug

    if (!authHeader) {
        return res.status(401).json({ message: 'Token requis' }); // Changer de 403 à 401
    }

    const token = authHeader.split(' ')[1]; // Récupère seulement le token
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' }); // Changer de 403 à 401
        }

        req.user = user; // Ajoute l'utilisateur dans la requête
        next();
    });
};

module.exports = authenticateToken;
