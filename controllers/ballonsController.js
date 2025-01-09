const sql = require('mssql');

const getAllBallons = async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT TOP (1000) [idBallon], [nomSport], [tailleBallon], [poidsBallon], [materiauBallon], [stockBallon], [idProduit]
            FROM [ProjetSQLserver].[dbo].[BALLON]
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données', details: err });
    }
};

module.exports = {
    getAllBallons // Export de la fonction
};
