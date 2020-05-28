'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'tasks',
            'tests',
            'basic_tests'
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'tasks',
            'basic_tests',
            'tests'
        );
    }
};