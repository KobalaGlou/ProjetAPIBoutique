const express = require('express');
const router = express.Router();
const TypeUtilisateurController = require('../controllers/typeutilisateurController');
const authenticate = require('../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: TypeUtilisateur
 *   description: Gestion des types d'utilisateur
 */

/**
 * @swagger
 * /v0/type-utilisateur:
 *   get:
 *     summary: Récupérer tous les types d'utilisateur
 *     tags:
 *       - TypeUtilisateur
 *     security:
 *       - BearerAuth: []
 *     description: Renvoie la liste complète des types d'utilisateur.
 *     responses:
 *       200:
 *         description: Liste des types d'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nom:
 *                     type: string
 *                     example: "Admin"
 */
router.get('/',authenticate, TypeUtilisateurController.getAllTypeUtilisateurs);

/**
 * @swagger
 * /v0/type-utilisateur/{id}:
 *   get:
 *     summary: Récupérer un type d'utilisateur par son ID
 *     tags:
 *       - TypeUtilisateur
 *     security:
 *       - BearerAuth: []
 *     description: Renvoie les détails d'un type d'utilisateur spécifique par ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du type d'utilisateur
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Détails du type d'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nom:
 *                   type: string
 *                   example: "Admin"
 *       404:
 *         description: Type d'utilisateur non trouvé
 */
router.get('/:id',authenticate, TypeUtilisateurController.getTypeUtilisateurById);

/**
 * @swagger
 * /v0/type-utilisateur:
 *   post:
 *     summary: Créer un nouveau type d'utilisateur
 *     tags:
 *       - TypeUtilisateur
 *     security:
 *       - BearerAuth: []
 *     description: Permet de créer un nouveau type d'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "User"
 *     responses:
 *       201:
 *         description: Type d'utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/',authenticate, TypeUtilisateurController.createTypeUtilisateur);

/**
 * @swagger
 * /v0/type-utilisateur/{id}:
 *   put:
 *     summary: Mettre à jour un type d'utilisateur existant
 *     tags:
 *       - TypeUtilisateur
 *     security:
 *       - BearerAuth: []
 *     description: Permet de mettre à jour un type d'utilisateur en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du type d'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Editor"
 *     responses:
 *       200:
 *         description: Type d'utilisateur mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Type d'utilisateur non trouvé
 */
router.put('/:id',authenticate, TypeUtilisateurController.updateTypeUtilisateur);

/**
 * @swagger
 * /v0/type-utilisateur/{id}:
 *   delete:
 *     summary: Supprimer un type d'utilisateur
 *     tags:
 *       - TypeUtilisateur
 *     security:
 *       - BearerAuth: []
 *     description: Permet de supprimer un type d'utilisateur en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du type d'utilisateur à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Type d'utilisateur supprimé avec succès
 *       404:
 *         description: Type d'utilisateur non trouvé
 */
router.delete('/:id',authenticate, TypeUtilisateurController.deleteTypeUtilisateur);

module.exports = router;
