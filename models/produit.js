const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Produit', {
        idProduit: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        refProduit: { type: DataTypes.STRING, allowNull: false },
        nomProduit: { type: DataTypes.STRING, allowNull: false },
        descProduit: { type: DataTypes.STRING, allowNull: false },
        prixHTProduit: { type: DataTypes.INTEGER, allowNull: false },
        isActif: { type: DataTypes.BOOLEAN, allowNull: false },
        dateCreation: { type: DataTypes.DATE, allowNull: false },
        dateModif: { type: DataTypes.DATE },
        dateSuppr: { type: DataTypes.DATE }
    }, { timestamps: false });
};
