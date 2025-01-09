const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const login = (req, res) => {
    const { username, password } = req.body;
    console.log("🔍 Requête reçue :", req.body);

    if (username === 'admin' && password === 'test') {
        console.log("✅ Authentification réussie");

        const payload = { username, role: 'admin' };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        return res.json({ token });
    } else {
        console.log("❌ Identifiants incorrects !");
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }
};

module.exports = { login };
