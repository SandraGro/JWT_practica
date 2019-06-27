var Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Clientes = sequelize.define('clientes',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        nombre:{
            type: Sequelize.STRING,
            allowNull:false
        },
        email:{
            type: Sequelize.STRING,
            allowNull:false
        },
        telefono:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        area:{
            type: Sequelize.STRING,
            allowNull:false
        }
    }, {timestamps:false});

    return Clientes;
}