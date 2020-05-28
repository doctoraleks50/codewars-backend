'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'tasks',
            'start_code',
            {
                type: Sequelize.STRING,
                allowNull: false
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'tasks',
            'start_code',
            {
                type: Sequelize.STRING
            }
        );
    }
};