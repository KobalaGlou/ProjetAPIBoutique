const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const models = {};

// Import des modèles
models.TypeUtilisateur = require('./type_utilisateur')(sequelize);
models.Utilisateur = require('./utilisateur.js/index.js')(sequelize);
models.Produit = require('./produit.js')(sequelize);
models.Sac = require('./sac')(sequelize);
models.Ballon = require('./ballon')(sequelize);
models.Service = require('./service')(sequelize);
models.StockMouvement = require('./stock_mouvement')(sequelize);
models.Commande = require('./commande')(sequelize);
models.Message = require('./message')(sequelize);
models.Adresse = require('./adresse')(sequelize);
models.Commentaire = require('./commentaire')(sequelize);
models.DemandeAffectation = require('./demande_affectation')(sequelize);
models.DetailCommande = require('./detail_commande')(sequelize);
models.Livraison = require('./livraison.js/index.js')(sequelize);

// Définition des relations entre les modèles
models.Utilisateur.belongsTo(models.TypeUtilisateur, { foreignKey: 'idType' });
models.Utilisateur.hasMany(models.Utilisateur, { as: 'Subordinates', foreignKey: 'idResponsable' });

models.Produit.hasMany(models.Sac, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.Ballon, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.Service, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.StockMouvement, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.Commentaire, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.Service, { foreignKey: 'idProduit' });


models.Commande.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
models.DetailCommande.belongsTo(models.Commande, { foreignKey: 'idCommande' });
models.DetailCommande.belongsTo(models.Produit, { foreignKey: 'idProduit' });

models.Message.belongsTo(models.Utilisateur, { as: 'Sender', foreignKey: 'idEnvoyeur' });
models.Message.belongsTo(models.Utilisateur, { as: 'Receiver', foreignKey: 'idRecevoir' });

models.Livraison.belongsTo(models.Commande, { foreignKey: 'idCommande' });
models.Livraison.belongsTo(models.Utilisateur, { as: 'Livreur', foreignKey: 'IdLivreur' });

models.Adresse.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });

models.DemandeAffectation.belongsTo(models.Utilisateur, { as: 'Demandeur', foreignKey: 'idUtilisateur' });
models.DemandeAffectation.belongsTo(models.Utilisateur, { as: 'Responsable', foreignKey: 'idResponsable' });

models.Service.belongsTo(models.Produit, { foreignKey: 'idProduit' });

models.StockMouvement.belongsTo(models.Produit, { foreignKey: 'idProduit' });
models.Produit.hasMany(models.StockMouvement, { foreignKey: 'idProduit' });

models.Commande.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
models.Utilisateur.hasMany(models.Commande, { foreignKey: 'idUtilisateur' });

models.Message.belongsTo(models.Utilisateur, { as: 'Receveur', foreignKey: 'idRecevoir' });
models.Message.belongsTo(models.Utilisateur, { as: 'Envoyeur', foreignKey: 'idEnvoyeur' });

models.Adresse.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
models.Utilisateur.hasMany(models.Adresse, { foreignKey: 'idUtilisateur' });

models.Commentaire.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
models.Commentaire.belongsTo(models.Produit, { foreignKey: 'idProduit' });

models.DemandeAffectation.belongsTo(models.Utilisateur, { as: 'Responsable', foreignKey: 'idResponsable' });
models.DemandeAffectation.belongsTo(models.Utilisateur, { as: 'Utilisateur', foreignKey: 'idUtilisateur' });

models.DetailCommande.belongsTo(models.Produit, { foreignKey: 'idProduit' });
models.DetailCommande.belongsTo(models.Commande, { foreignKey: 'idCommande' });

models.Livraison.belongsTo(models.Utilisateur, { as: 'Livreur', foreignKey: 'IdLivreur' });
models.Livraison.belongsTo(models.Commande, { foreignKey: 'idCommande' });



// Synchronisation avec la base de données
sequelize.sync({ alter: true })
    .then(() => console.log('Base de données synchronisée'))
    .catch(err => console.error('Erreur de synchronisation:', err));

module.exports = models;
