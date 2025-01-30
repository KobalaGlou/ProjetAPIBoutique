require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectDB } = require('./config/db'); // ✅ Connexion à la BDD

const app = express();
const server = http.createServer(app); // Création du serveur HTTP
const io = socketIo(server, {
    cors: {
        origin: "*", // À sécuriser plus tard
        methods: ["GET", "POST", "PUT", "DELETE"]
    },
    path: '/socketio'  // Définir un chemin personnalisé pour les WebSockets
});

const path = require("path");
app.get("/v0/socket", (req, res) => {
  res.sendFile(path.join(__dirname, "interfaceSIO.html"));
});


app.use(express.json());


// Servir le fichier HTML pour l'interface de chat
app.use(express.static('public')); // Assure-toi que 'index.html' est dans le dossier 'public'


// Connexion à la base de données
connectDB();
const db = require('./models');

// Importation des routes
const ballonsRoutes = require('./routes/ballons');
const authRoutes = require('./routes/auth');
const typeUtilisateurRoutes = require('./routes/typeutilisateur'); 

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API avec SQL Server 🚀');
});

// Définition des routes
app.use('/ballons', ballonsRoutes);
app.use('/auth', authRoutes);
app.use('/v0/type-utilisateur', typeUtilisateurRoutes); 

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
