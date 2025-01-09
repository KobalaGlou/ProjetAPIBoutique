const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Commentaire', {
        idCommentaire: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        noteCommentaire: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        contenuCommentaire: { 
            type: DataTypes.STRING(255), 
            allowNull: false 
        },
        isVisible: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: true 
        },
        dateCreation: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        },
        dateSuppr: { 
            type: DataTypes.DATE, 
            allowNull: true 
        }
    }, { 
        timestamps: false 
    });
};
