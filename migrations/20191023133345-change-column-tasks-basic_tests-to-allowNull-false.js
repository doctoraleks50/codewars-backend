'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'tasks',
            'basic_tests',
            {
                type: Sequelize.STRING,
                allowNull: false
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'tasks',
            'basic_tests',
            {
                type: Sequelize.STRING
            }
        );
    }
};