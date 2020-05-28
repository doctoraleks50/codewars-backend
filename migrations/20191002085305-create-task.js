'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED
            },
            title: {
                type: Sequelize.STRING
            },
            instruction: {
                type: Sequelize.STRING
            },
            start_code: {
                type: Sequelize.STRING
            },
            tests: {
                type: Sequelize.STRING
            },
            user_id: {
                type: Sequelize.INTEGER.UNSIGNED
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tasks');
    }
};
