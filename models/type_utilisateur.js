const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('TypeUtilisateur', {
        idType: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nomType: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: false });
};
