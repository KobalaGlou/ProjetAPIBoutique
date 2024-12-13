const { Sequelize } = require('sequelize');

// Créez une instance de Sequelize pour SQL Server
const sequelize = new Sequelize('ProjetSQLserver', 'API_user', 'API', {
  host: 'localhost',        // Ou l'adresse IP de votre serveur
  dialect: 'mssql',         // SQL Server utilise "mssql" comme dialecte
  port: 1433,
  dialectOptions: {
    options: {
      encrypt: true,       // S'assurer que la connexion est sécurisée (si nécessaire)
      trustServerCertificate: true, // Si vous avez des problèmes avec le certificat SSL
    }
  }
});

// Tester la connexion
sequelize.authenticate()
  .then(() => {
    console.log('La connexion à la base de données a réussi.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

module.exports = sequelize;
