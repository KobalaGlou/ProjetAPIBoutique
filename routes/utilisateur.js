const express = require('express');
const router = express.Router();
const UtilisateurController = require('../controllers/utilisateurController');
const authenticate = require('../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Utilisateur
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /v0/utilisateur:
 *   get:
 *     summary: Récupérer tous les utilisateurs (Admin uniquement)
 *     tags: [Utilisateur]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/',authenticate, UtilisateurController.getAllUtilisateurs);

/**
 * @swagger
 * /v0/utilisateur/{idUtilisateur}:
 *   get:
 *     summary: Récupérer un utilisateur par son ID
 *     tags: [Utilisateur]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: idUtilisateur
 *         in: path
 *         required: true
 *         description: L'ID de l'utilisateur
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 */
router.get('/:idUtilisateur',authenticate, UtilisateurController.getUtilisateurById);

/**
 * @swagger
 * /v0/utilisateur:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Utilisateur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailUtilisateur:
 *                 type: string
 *                 example: "test@example.com"
 *               nomUtilisateur:
 *                 type: string
 *                 example: "Dupont"
 *               prenomUtilisateur:
 *                 type: string
 *                 example: "Jean"
 *               telUtilisateur:
 *                 type: string
 *                 example: "0600000000"
 *               mdpUtilisateur:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
router.post('/',authenticate, UtilisateurController.createUtilisateur);

/**
 * @swagger
 * /v0/utilisateur/{idUtilisateur}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Utilisateur]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: idUtilisateur
 *         in: path
 *         required: true
 *         description: L'ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 */
router.put('/:idUtilisateur',authenticate, UtilisateurController.updateUtilisateur);

/**
 * @swagger
 * /v0/utilisateur/{idUtilisateur}:
 *   delete:
 *     summary: Supprimer un utilisateur (Admin uniquement)
 *     tags: [Utilisateur]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: idUtilisateur
 *         in: path
 *         required: true
 *         description: L'ID de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 */
router.delete('/:idUtilisateur',authenticate, UtilisateurController.deleteUtilisateur);

module.exports = router;
