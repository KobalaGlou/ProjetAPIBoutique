const { Utilisateur } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

// 🔹 Obtenir tous les utilisateurs (Admin uniquement)
exports.getAllUtilisateurs = [
    verifyToken,
    verifyRole('admin'),
    async (req, res) => {
        try {
            const utilisateurs = await Utilisateur.findAll({
                attributes: { exclude: ['mdpUtilisateur'] } // Exclure le mot de passe
            });
            res.status(200).json(utilisateurs);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
        }
    }
];

// 🔹 Obtenir un utilisateur par ID
exports.getUtilisateurById = [
    verifyToken,
    async (req, res) => {
        try {
            const utilisateur = await Utilisateur.findByPk(req.params.idUtilisateur, {
                attributes: { exclude: ['mdpUtilisateur'] }
            });

            if (!utilisateur) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            res.status(200).json(utilisateur);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
        }
    }
];

// 🔹 Créer un utilisateur
exports.createUtilisateur = async (req, res) => {
    try {
        const { emailUtilisateur, nomUtilisateur, prenomUtilisateur, telUtilisateur, mdpUtilisateur } = req.body;

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(mdpUtilisateur, 10);

        const utilisateur = await Utilisateur.create({
            emailUtilisateur,
            nomUtilisateur,
            prenomUtilisateur,
            telUtilisateur,
            mdpUtilisateur: hashedPassword
        });

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
    }
};

// 🔹 Mettre à jour un utilisateur
exports.updateUtilisateur = [
    verifyToken,
    async (req, res) => {
        try {
            const utilisateur = await Utilisateur.findByPk(req.params.idUtilisateur);

            if (!utilisateur) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            const { emailUtilisateur, nomUtilisateur, prenomUtilisateur, telUtilisateur, mdpUtilisateur } = req.body;

            // Hash du mot de passe si mis à jour
            let hashedPassword = utilisateur.mdpUtilisateur;
            if (mdpUtilisateur) {
                hashedPassword = await bcrypt.hash(mdpUtilisateur, 10);
            }

            await utilisateur.update({
                emailUtilisateur,
                nomUtilisateur,
                prenomUtilisateur,
                telUtilisateur,
                mdpUtilisateur: hashedPassword
            });

            res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
        }
    }
];

// 🔹 Supprimer un utilisateur (Admin uniquement)
exports.deleteUtilisateur = [
    verifyToken,
    verifyRole('admin'),
    async (req, res) => {
        try {
            const utilisateur = await Utilisateur.findByPk(req.params.idUtilisateur);

            if (!utilisateur) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            await utilisateur.destroy();
            res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
        }
    }
];
