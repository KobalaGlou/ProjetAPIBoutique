require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectDB } = require('./config/db'); // ✅ Connexion à la BDD

const app = express();
const server = http.createServer(app); // Création du serveur HTTP
const io = socketIo(server, {
    cors: {
        origin: "*", // 🔒 À modifier pour sécuriser
        methods: ["GET", "POST"]
    }
});

app.use(express.json());

// Connexion à la base de données
connectDB();
const db = require('./models');

// Importation des routes
const ballonsRoutes = require('./routes/ballons');
const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API avec SQL Server 🚀');
});

app.use('/ballons', ballonsRoutes);
app.use('/auth', authRoutes);

// Gestion du chat en temps réel avec Socket.io
io.on('connection', (socket) => {
    console.log(`🟢 Utilisateur connecté : ${socket.id}`);

    socket.on('message', (data) => {
        console.log(`📩 Message reçu : ${data}`);
        io.emit('message', data); // Réémet le message à tous les clients
    });

    socket.on('disconnect', () => {
        console.log(`🔴 Utilisateur déconnecté : ${socket.id}`);
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
