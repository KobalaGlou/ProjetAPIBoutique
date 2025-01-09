const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Commande', {
        idCommande: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        montantTotalHT: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        montantTotalTTC: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        statut: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        dateCommande: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        },
        dateModif: { 
            type: DataTypes.DATE, 
            allowNull: true 
        },
        dateSuppr: { 
            type: DataTypes.DATE, 
            allowNull: true 
        }
    }, { 
        timestamps: false 
    });
};
