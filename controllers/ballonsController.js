const { Ballon, Produit } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware de vérification du JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ message: "Token requis" });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide" });
        }
        req.user = decoded;
        next();
    });
};

// Vérification du rôle de l'utilisateur
const verifyRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Accès interdit" });
        }
        next();
    };
};

// Obtenir tous les ballons
exports.getAllBallons = async (req, res) => {
    try {
        const ballons = await Ballon.findAll({
            include: [{ model: Produit }]
        });
        res.status(200).json(ballons);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des ballons", error });
    }
};

// Obtenir un ballon par ID
exports.getBallonById = async (req, res) => {
    try {
        const ballon = await Ballon.findByPk(req.params.id, {
            include: [{ model: Produit }]
        });
        if (!ballon) {
            return res.status(404).json({ message: "Ballon non trouvé" });
        }
        res.status(200).json(ballon);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du ballon", error });
    }
};

// Créer un ballon (admin uniquement)
exports.createBallon = [
    verifyToken,
    verifyRole('admin'),
    async (req, res) => {
        try {
            const { refProduit, nomProduit, descProduit, prixHTProduit, isActif, nomSport, tailleBallon, poidsBallon, materiauBallon, stockBallon } = req.body;

            // Création du produit associé
            const produit = await Produit.create({ refProduit, nomProduit, descProduit, prixHTProduit, isActif, dateCreation: new Date() });

            // Création du ballon lié au produit
            const ballon = await Ballon.create({ nomSport, tailleBallon, poidsBallon, materiauBallon, stockBallon, idProduit: produit.idProduit });

            res.status(201).json(ballon);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du ballon", error });
        }
    }
];

// Mettre à jour un ballon (admin uniquement)
exports.updateBallon = [
    verifyToken,
    verifyRole('admin'),
    async (req, res) => {
        try {
            const { nomSport, tailleBallon, poidsBallon, materiauBallon, stockBallon } = req.body;
            const ballon = await Ballon.findByPk(req.params.id);

            if (!ballon) {
                return res.status(404).json({ message: "Ballon non trouvé" });
            }

            await ballon.update({ nomSport, tailleBallon, poidsBallon, materiauBallon, stockBallon });

            res.status(200).json(ballon);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du ballon", error });
        }
    }
];

// Supprimer un ballon (admin uniquement)
exports.deleteBallon = [
    verifyToken,
    verifyRole('admin'),
    async (req, res) => {
        try {
            const ballon = await Ballon.findByPk(req.params.id);

            if (!ballon) {
                return res.status(404).json({ message: "Ballon non trouvé" });
            }

            await ballon.destroy();
            res.status(200).json({ message: "Ballon supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du ballon", error });
        }
    }
];
