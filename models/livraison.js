const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Livraison', {
        idLivraison: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        statutLivraison: { 
            type: DataTypes.STRING(50), 
            allowNull: false 
        },
        datePrevu: { 
            type: DataTypes.DATE, 
            allowNull: false 
        },
        dateLivraison: { 
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
