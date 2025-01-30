const { TypeUtilisateur } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware de vérification du JWT
const verifyToken = (req, res, next) => {
    const token = req.query['authorization'];

    if (!token) {
        return res.status(403).json({ message: "Token requis" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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

// Obtenir tous les types d'utilisateur
exports.getAllTypeUtilisateurs = async (req, res) => {
    try {
        const types = await TypeUtilisateur.findAll();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des types d'utilisateur", error });
    }
};

// Obtenir un type d'utilisateur par ID
exports.getTypeUtilisateurById = async (req, res) => {
    try {
        const type = await TypeUtilisateur.findByPk(req.params.id);
        if (!type) {
            return res.status(404).json({ message: "Type d'utilisateur non trouvé" });
        }
        res.status(200).json(type);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du type d'utilisateur", error });
    }
};

// Créer un type d'utilisateur (admin uniquement)
exports.createTypeUtilisateur = [
    verifyToken,
    verifyRole('admin'),
    async (req, res) => {
        try {
            console.log(req.body);
            const { nomType } = req.body;
            const type = await TypeUtilisateur.create({ nomType });
            res.status(201).json(type);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du type d'utilisateur", error });
        }
    }
];

// Mettre à jour un type d'utilisateur (admin uniquement)
exports.updateTypeUtilisateur = [
    verifyToken,
    verifyRole('admin'),
    async (req, res) => {
        try {
            const { nomType } = req.body;
            const type = await TypeUtilisateur.findByPk(req.params.id);

            if (!type) {
                return res.status(404).json({ message: "Type d'utilisateur non trouvé" });
            }

            await type.update({ nomType });
            res.status(200).json(type);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du type d'utilisateur", error });
        }
    }
];

// Supprimer un type d'utilisateur (admin uniquement)
exports.deleteTypeUtilisateur = [
    verifyToken,
    verifyRole('admin'),
    async (req, res) => {
        try {
            const type = await TypeUtilisateur.findByPk(req.params.id);

            if (!type) {
                return res.status(404).json({ message: "Type d'utilisateur non trouvé" });
            }

            await type.destroy();
            res.status(200).json({ message: "Type d'utilisateur supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du type d'utilisateur", error });
        }
    }
];