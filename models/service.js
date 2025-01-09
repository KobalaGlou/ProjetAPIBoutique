const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Sac', {
        idService: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        typeService: { type: DataTypes.STRING, allowNull: false },
        dureeMinutesService: { type: DataTypes.INTEGER, allowNull: false },
        isSurPlace: { type: DataTypes.BOOLEAN, allowNull: false },
        isDeplacement: { type: DataTypes.BOOLEAN, allowNull: false },
    }, { timestamps: false });
};
