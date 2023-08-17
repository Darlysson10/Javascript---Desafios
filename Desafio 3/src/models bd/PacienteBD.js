const Sequelize = require('sequelize');
const database = require('../db');
const AgendaBD = require('./AgendaBD');
// TODO: Mudar para uma classe
const PacienteBD = database.define('paciente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    dataNascimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

PacienteBD.hasOne(AgendaBD, {constraints: true, foreignKey: 'cpf', onDelete: 'CASCADE'});
AgendaBD.hasMany(PacienteBD, {foreignKey: 'cpf'});
module.exports = PacienteBD;