'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'users',
            'google_id',
            {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'users',
            'google_id'
        );
    }
};