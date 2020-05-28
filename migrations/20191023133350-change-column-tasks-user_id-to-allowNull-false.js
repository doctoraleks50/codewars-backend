'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'tasks',
            'user_id',
            {
                type: Sequelize.STRING,
                allowNull: false
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'tasks',
            'user_id',
            {
                type: Sequelize.STRING
            }
        );
    }
};