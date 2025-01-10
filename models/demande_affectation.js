const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('DemandeAffectation', {
        idDemande: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        statutDemande: { 
            type: DataTypes.STRING(50), 
            allowNull: false 
        },
        dateDemande: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        },
        dateTraitement: { 
            type: DataTypes.DATE, 
            allowNull: true 
        }
    }, { 
        timestamps: false 
    });
};
