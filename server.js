require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectDB } = require('./config/db'); // ✅ Connexion à la BDD
const path = require('path');

// Importer le fichier de configuration Swagger
const setupSwagger = require('./swagger'); // Si ton fichier est bien à la racine

const app = express();
const server = http.createServer(app); // Création du serveur HTTP
const io = socketIo(server, {
    cors: {
        origin: "*", // À sécuriser plus tard
        methods: ["GET", "POST", "PUT", "DELETE"]
    },
    path: '/socketio'  // Définir un chemin personnalisé pour les WebSockets
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
const utilisateurRoutes = require('./routes/utilisateur');

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API avec SQL Server 🚀');
});

app.get("/v0/socket", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'interfaceSIO.html'));
});
 
// Définition des routes
app.use('/ballons', ballonsRoutes);
app.use('/v0/auth/', authRoutes);
app.use('/v0/type-utilisateur', typeUtilisateurRoutes);
app.use('/v0/utilisateur', utilisateurRoutes);



// Appeler setupSwagger pour initialiser Swagger
setupSwagger(app);

// Gestion du chat en temps réel avec Socket.io
io.on('connection', (socket) => {
    console.log(`🟢 Utilisateur connecté : ${socket.id}`);

    socket.on('message', (message) => {
        console.log(`📩 Message reçu : ${message}`);

        // Vérifier si c'est une commande /dab
        if (message.startsWith('/dab ')) {
            console.log("ça marche");
            const montant = parseFloat(message.split(' ')[1]);

            if (isNaN(montant) || montant <= 0) {
                socket.emit('message', { id: socket.id, message: "⚠️ Montant invalide. Utilisation : /dab <prix>", isPrivate: true });
                return;
            }

            const billets = [500, 200, 100, 50, 20, 10, 5, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
            let reste = montant;
            let distribution = [];

            billets.forEach(billet => {
                let nombre = Math.floor(reste / billet);
                if (nombre > 0) {
                    distribution.push(`${nombre} x ${billet}€`);
                    reste = (reste - nombre * billet).toFixed(2); // Correction des erreurs d'arrondi
                }
            });

            const reponse = `💰 Distribution pour ${montant}€ :\n` + distribution.join(', ');

            // Envoyer UNIQUEMENT au demandeur
            socket.emit('message', { id: socket.id, message: reponse, isPrivate: true });
        } else {
            // Message normal → on l'envoie à tout le monde
            io.emit('message', { message, id: socket.id });
        }
    });


    socket.on('disconnect', () => {
        console.log(`🔴 Utilisateur déconnecté : ${socket.id}`);
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
