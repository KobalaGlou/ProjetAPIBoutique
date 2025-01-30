const io = require("socket.io-client");
const readline = require("readline");

// Connexion au serveur WebSocket
const socket = io("http://localhost:3000", {
    path:"/socketio",
    reconnectionAttempts: 5, // Nombre de tentatives de reconnexion
    timeout: 5000, // Timeout en ms (5 sec)
});

// Interface pour lire l'entrée utilisateur dans le terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Debug : Vérifier la connexion
socket.on("connect", () => {
    console.log(`✅ Connecté au serveur WebSocket avec l'ID : ${socket.id}`);
    demanderMessage();
});

// Debug : Vérifier la reconnexion
socket.on("reconnect_attempt", () => {
    console.log("♻️ Tentative de reconnexion...");
});

// Debug : Afficher les erreurs de connexion
socket.on("connect_error", (error) => {
    console.error(`❌ Erreur de connexion : ${error.message}`);
    console.error(error);
});

// Debug : Vérifier la déconnexion
socket.on("disconnect", (reason) => {
    console.log(`🔴 Déconnecté du serveur (${reason})`);
    rl.close();
});

// Écouter les messages du serveur
socket.on("message", (data) => {
    if (data.id !== socket.id) { // Vérifie si l'expéditeur est un autre utilisateur
        console.log(`📩 Nouveau message reçu : ${data.message}`);
    }
});

// Fonction pour envoyer des messages depuis le terminal
function demanderMessage() {
    rl.question("📝 Tape ton message : ", (message) => {
        if (message.trim() === "") {
            console.log("⚠️ Message vide, réessaie !");
        } else {
            console.log(`📤 Envoi du message : ${message}`);
            socket.emit("message", { message, id: socket.id }); // Envoi avec l'ID
        }
        demanderMessage();
    });
}
