const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Utilisateur } = require('../models'); // Assurez-vous que le modèle est bien importé
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("🔍 Requête reçue :", req.body);

    try {
        // Rechercher l'utilisateur par email
        const utilisateur = await Utilisateur.findOne({ where: { emailUtilisateur: email } });

        if (!utilisateur) {
            console.log("❌ Utilisateur non trouvé !");
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        // Vérifier le mot de passe avec bcrypt
        const match = await bcrypt.compare(password, utilisateur.mdpUtilisateur);
        if (!match) {
            console.log("❌ Mot de passe incorrect !");
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        console.log("✅ Authentification réussie");

        // Création du token JWT
        const payload = {
            id: utilisateur.idUtilisateur,
            email: utilisateur.emailUtilisateur,
            role: 'user' // Tu peux ajouter un champ role si nécessaire
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error("🔥 Erreur lors de l'authentification :", error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { login };
