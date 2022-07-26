import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Utilizator = db.define('Utilizator', {

    IDUtilizator:
    {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },

    NumeUtilizator:
    {
        type:Sequelize.STRING,
        allowNull:false
    },
    
    PrenumeUtilizator:
    {
        type:Sequelize.STRING,
        allowNull:false
    },

    VarstaUtilizator:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    NumarDeTelefon:{
        type: Sequelize.STRING,
        allowNull: false
    },

    Email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
    Parola:{
        type: Sequelize.STRING,
        allowNull:false
    },

    UserName:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true
    }

})

export default Utilizator;