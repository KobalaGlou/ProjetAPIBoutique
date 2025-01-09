const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Sac', {
        idSac: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        tailleSac: { type: DataTypes.STRING, allowNull: false },
        capaciteSac: { type: DataTypes.INTEGER, allowNull: false },
        materiauSac: { type: DataTypes.STRING, allowNull: false },
        couleurSac: { type: DataTypes.STRING, allowNull: false },
        stockSac: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: false });
};
