var Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define('usuarios', {
        area: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ubicacion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }

    }, { timestamps: false });

    return User;
}