const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('StockMouvement', {
        idMouv: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        typeProduit: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        quantiteMouv: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        typeMouv: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        dateMouv: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        }
    }, { 
        timestamps: false 
    });
};
