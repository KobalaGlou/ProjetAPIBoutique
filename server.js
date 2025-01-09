// Importation des modules
require('dotenv').config();  // Charger les variables d'environnement en premier
const express = require('express');
const sql = require('mssql');
const jwt = require('jsonwebtoken');  // Importer jsonwebtoken en haut

// Création de l'application Express
const app = express();
app.use(express.json()); // Permet de lire les requêtes JSON

// Configuration SQL Server
const config = {
    user: 'API_user',      
    password: 'loulou49', 
    server: 'localhost',          
    database: 'ProjetSQLserver',   
    options: {
        encrypt: false,           
        trustServerCertificate: true 
    }
};

// Connexion à SQL Server
sql.connect(config)
    .then(() => console.log('✅ Connexion à SQL Server réussie !'))
    .catch(err => console.error('❌ Erreur de connexion à SQL Server :', err));

// Récupérer la clé secrète pour JWT
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error("❌ ERREUR : JWT_SECRET n'est pas défini dans le fichier .env !");
    process.exit(1); // Arrêter le serveur si la clé JWT est manquante
}

// Route d'accueil (test)
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API avec SQL Server 🚀');
});

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Récupérer le token depuis l'en-tête

    if (!token) {
        return res.status(403).json({ message: 'Accès interdit, token manquant' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }

        req.user = user;
        next();
    });
};

// Route protégée : récupération des ballons
app.get('/ballons', authenticateToken, async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT TOP (1000) [idBallon], [nomSport], [tailleBallon], [poidsBallon], [materiauBallon], [stockBallon], [idProduit]
            FROM [ProjetSQLserver].[dbo].[BALLON]
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données', details: err });
    }
});

// Route de connexion (génération du token)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log("Requête reçue :", req.body);  // Debug log

    if (username === 'admin' && password === 'test') {
        console.log("✅ Authentification réussie");

        const payload = { username, role: 'admin' };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        return res.json({ token });
    } else {
        console.log("❌ Identifiants incorrects !");
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
