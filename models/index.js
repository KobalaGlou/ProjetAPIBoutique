const { sequelize } = require('../config/db');

const models = {};

// Import des modèles
models.TypeUtilisateur = require('./Type_utilisateur')(sequelize);
models.Utilisateur = require('./Utilisateur')(sequelize);
models.Produit = require('./Produit')(sequelize);
models.Sac = require('./Sac')(sequelize);
models.Ballon = require('./Ballon')(sequelize);
models.Service = require('./Service')(sequelize);
models.StockMouvement = require('./Stock_mouvement')(sequelize);
models.Commande = require('./Commande')(sequelize);
models.Message = require('./Message')(sequelize);
models.Adresse = require('./Adresse')(sequelize);
models.Commentaire = require('./Commentaire')(sequelize);
models.DemandeAffectation = require('./Demande_affectation')(sequelize);
models.DetailCommande = require('./Detail_commande')(sequelize);
models.Livraison = require('./Livraison')(sequelize);

// Définition des relations entre les modèles

// 🔹 Relations Utilisateur
models.Utilisateur.belongsTo(models.TypeUtilisateur, { foreignKey: 'idType' });
models.Utilisateur.hasMany(models.Utilisateur, { as: 'Subordinates', foreignKey: 'idResponsable' });
models.Utilisateur.hasMany(models.Commande, { foreignKey: 'idUtilisateur' });
models.Utilisateur.hasMany(models.Adresse, { foreignKey: 'idUtilisateur' });
models.Utilisateur.hasMany(models.Message, { as: 'MessagesEnvoyes', foreignKey: 'idEnvoyeur' });
models.Utilisateur.hasMany(models.Message, { as: 'MessagesRecus', foreignKey: 'idRecevoir' });
models.Utilisateur.hasMany(models.Commentaire, { foreignKey: 'idUtilisateur' });
models.Utilisateur.hasMany(models.DemandeAffectation, { as: 'DemandesFaites', foreignKey: 'idUtilisateur' });
models.Utilisateur.hasMany(models.DemandeAffectation, { as: 'DemandesReçues', foreignKey: 'idResponsable' });
models.Utilisateur.hasMany(models.Livraison, { as: 'LivraisonsEffectuees', foreignKey: 'IdLivreur' });

// 🔹 Relations Produit
models.Produit.hasMany(models.Sac, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.Ballon, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.Service, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.StockMouvement, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.Commentaire, { foreignKey: 'idProduit' });

// 🔹 Relations Service
models.Service.belongsTo(models.Produit, { foreignKey: 'idProduit' });

// 🔹 Relations Commande
models.Commande.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
models.Commande.hasMany(models.DetailCommande, { foreignKey: 'idCommande' });
models.Commande.hasOne(models.Livraison, { foreignKey: 'idCommande' });

// 🔹 Relations Livraison
models.Livraison.belongsTo(models.Commande, { foreignKey: 'idCommande' });
models.Livraison.belongsTo(models.Utilisateur, { as: 'Livreur', foreignKey: 'IdLivreur' });

// 🔹 Relations Message
models.Message.belongsTo(models.Utilisateur, { as: 'Sender', foreignKey: 'idEnvoyeur' });
models.Message.belongsTo(models.Utilisateur, { as: 'Receiver', foreignKey: 'idRecevoir' });

// 🔹 Relations Adresse
models.Adresse.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });

// 🔹 Relations Demande Affectation
models.DemandeAffectation.belongsTo(models.Utilisateur, { as: 'Demandeur', foreignKey: 'idUtilisateur' });
models.DemandeAffectation.belongsTo(models.Utilisateur, { as: 'Responsable', foreignKey: 'idResponsable' });

// 🔹 Relations Détail Commande
models.DetailCommande.belongsTo(models.Commande, { foreignKey: 'idCommande' });
models.DetailCommande.belongsTo(models.Produit, { foreignKey: 'idProduit' });

// 🔹 Relations Stock Mouvement
models.StockMouvement.belongsTo(models.Produit, { foreignKey: 'idProduit' });

// 🔹 Synchronisation avec la base de données
sequelize.sync({ force: false })
    .then(() => console.log('✅ Base de données synchronisée'))
    .catch(err => console.error('❌ Erreur de synchronisation :', err));

module.exports = models;
