const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Ballon', {
        idBallon: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nomSport: { type: DataTypes.STRING, allowNull: false },
        tailleBallon: { type: DataTypes.STRING, allowNull: false },
        poidsBallon: { type: DataTypes.INTEGER, allowNull: false },
        materiauBallon: { type: DataTypes.STRING, allowNull: false },
        stockBallon: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: false });
};
