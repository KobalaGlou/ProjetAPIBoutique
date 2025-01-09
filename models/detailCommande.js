const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('DetailCommande', {
        idDetail: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        quantiteProduit: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        prixUnitaireHT: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        dateService: { 
            type: DataTypes.DATE, 
            allowNull: false 
        }
    }, { 
        timestamps: false 
    });
};
