'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'users',
            'first_name',
            {
                type: Sequelize.STRING,
                allowNull: false
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'users',
            'first_name'
        );
    }
};