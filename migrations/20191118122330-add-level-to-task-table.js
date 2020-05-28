'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'tasks',
            'level',
            {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 8
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'tasks',
            'level'
        );
    }
};