const io = require("socket.io-client");
const readline = require("readline");

// Connexion au serveur WebSocket
const socket = io("http://192.168.56.1:3000", {
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
});

// Debug : Vérifier la déconnexion
socket.on("disconnect", (reason) => {
    console.log(`🔴 Déconnecté du serveur (${reason})`);
    rl.close();
});

// Écouter les messages du serveur
socket.on("message", (data) => {
    console.log(`📩 Nouveau message reçu : ${data}`);
});

// Fonction pour envoyer des messages depuis le terminal
function demanderMessage() {
    rl.question("📝 Tape ton message : ", (message) => {
        if (message.trim() === "") {
            console.log("⚠️ Message vide, réessaie !");
        } else {
            console.log(`📤 Envoi du message : ${message}`);
            socket.emit("message", message);
        }
        demanderMessage(); // Relancer la question après chaque message
    });
}
