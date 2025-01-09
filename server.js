// Importation des modules
const express = require('express');
const sql = require('mssql');

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

// Route d'accueil (test)
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API avec SQL Server 🚀');
});

app.get('/ballons', async (req, res) => {
    try {
        // Requête pour récupérer les 1000 premiers enregistrements de la table BALLON
        const result = await sql.query(`
            SELECT TOP (1000) [idBallon], [nomSport], [tailleBallon], [poidsBallon], [materiauBallon], [stockBallon], [idProduit]
            FROM [ProjetSQLserver].[dbo].[BALLON]
        `);
        // Envoi des résultats sous forme de JSON
        res.json(result.recordset);
    } catch (err) {
        // Gestion d'erreur
        res.status(500).json({ error: 'Erreur lors de la récupération des données', details: err });
    }
});


// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
