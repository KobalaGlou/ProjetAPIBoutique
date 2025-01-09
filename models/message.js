const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Message', {
        idMessage: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        sujetMessage: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        contenuMessage: { 
            type: DataTypes.STRING(1000), 
            allowNull: false 
        },
        estLu: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        dateEnvoiMessage: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        },
        dateSupprMessage: { 
            type: DataTypes.DATE, 
            allowNull: true 
        }
    }, { 
        timestamps: false 
    });
};
