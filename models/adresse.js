const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Adresse', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        rue: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        codePostal: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        ville: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        pays: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        isPrincipal: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        dateSuppresion: { 
            type: DataTypes.DATE, 
            allowNull: true 
        }
    }, { 
        timestamps: false 
    });
};
