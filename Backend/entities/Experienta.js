import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Experienta = db.define('Experienta', {

    IDExperienta:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    PunctPlecare:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    PunctSosire:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    Localitate:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    MijlocTransport:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    OraPlecare:{
        type: Sequelize.STRING,
        allowNull: false
    },
    DurataCalatorie:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    GradAglomerare:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Observatii:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    NivelSatisfactie:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IDUtilizator:
    {
        type: Sequelize.INTEGER,
        allowNull:false
    }

})

export default Experienta;

	