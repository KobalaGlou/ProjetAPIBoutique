require('dotenv').config();
const express = require('express');
const socketIo = require('socket.io');
const { connectDB } = require('./config/db');
const path = require('path');

const app = express();
connectDB();

const setupSwagger = require('./swagger');
setupSwagger(app);

app.use(express.json());
app.use(express.static('public'));

const ballonsRoutes = require('./routes/ballons');
const authRoutes = require('./routes/auth');
const typeUtilisateurRoutes = require('./routes/typeutilisateur');
const UtilisateurRoutes = require('./routes/utilisateur');

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API avec SQL Server 🚀');
});

app.get("/v0/socket", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'interfaceSIO.html'));
});

app.use('/ballons', ballonsRoutes);
app.use('/v0/auth', authRoutes);
app.use('/v0/type-utilisateur', typeUtilisateurRoutes);
app.use('/v0/utilisateur', UtilisateurRoutes);

// Exporter uniquement `app` sans démarrer le serveur
module.exports = app;
