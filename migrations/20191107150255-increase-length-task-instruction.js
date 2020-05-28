'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'tasks',
            'instruction',
            {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: ''
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'tasks',
            'instruction',
            {
                type: Sequelize.STRING,
                allowNull: false
            }
        );
    }
};