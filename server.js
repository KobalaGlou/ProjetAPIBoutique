require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');

const app = express();
app.use(express.json());

// Connexion à la base de données
connectDB();

// Importation des routes
const ballonsRoutes = require('./routes/ballons');
const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API avec SQL Server 🚀');
});

app.use('/ballons', ballonsRoutes);
app.use('/auth', authRoutes);

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
