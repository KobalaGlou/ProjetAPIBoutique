const { Sequelize } = require('sequelize');

// Créez une instance de Sequelize pour SQL Server
const sequelize = new Sequelize('ProjetSQLserver', 'API_user', 'loulou49', {
  host: 'localhost',        
  dialect: 'mssql',         
  port: 1433,
  dialectOptions: {
    options: {
      encrypt: true,      
      trustServerCertificate: true, 
    }
  }
});

// Tester la connexion
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à SQL Server réussie !');
  } catch (err) {
    console.error('❌ Impossible de se connecter à la base de données:', err);
  }
}

// Exporter la fonction de connexion
module.exports = { sequelize, connectDB };
