'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('agendas', {
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('agendas');

  }
};
