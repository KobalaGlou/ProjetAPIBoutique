const { Sequelize } = require('sequelize');

// Création de l'instance Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    logging: false, // Désactive les logs SQL
});

// Fonction pour établir la connexion à la base de données
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie');
    } catch (error) {
        console.error('❌ Erreur de connexion à la base de données :', error);
        process.exit(1); // Arrête le serveur en cas d'échec
    }
};

// ✅ On exporte à la fois `sequelize` et `connectDB`
module.exports = { sequelize, connectDB };
