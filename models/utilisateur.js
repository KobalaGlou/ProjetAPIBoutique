const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Utilisateur', {
        idUtilisateur: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        emailUtilisateur: { type: DataTypes.STRING, allowNull: false },
        nomUtilisateur: { type: DataTypes.STRING, allowNull: false },
        mdpUtilisateur: { type: DataTypes.STRING, allowNull: false },
        prenomUtilisateur: { type: DataTypes.STRING, allowNull: false },
        telUtilisateur: { type: DataTypes.STRING, allowNull: false },
        isActif: { type: DataTypes.BOOLEAN, defaultValue: true },
        dateCreation: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        dateModif: { type: DataTypes.DATE },
        dateSuppresion: { type: DataTypes.DATE }
    }, { timestamps: false });
};
