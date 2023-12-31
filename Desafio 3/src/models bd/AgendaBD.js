const Sequelize = require('sequelize');
const database = require('../db');
const PacienteBD = require('./PacienteBD');

const AgendaBD = database.define('agenda', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horaInicial: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horaFinal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tempo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'pacientes',
            key: 'cpf'
        }
    }

}, {
    timestamps: false
});

module.exports = AgendaBD;