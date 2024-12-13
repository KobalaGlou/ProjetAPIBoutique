const express = require('express');
const app = express();

// Définir une route simple
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
