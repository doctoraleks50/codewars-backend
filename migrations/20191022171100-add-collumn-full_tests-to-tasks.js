'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'tasks',
            'full_tests',
            {
                type: Sequelize.STRING
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'tasks',
            'full_tests'
        );
    }
};