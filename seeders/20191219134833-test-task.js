'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('tasks', [
            {
                id: 1,
                title: 'Title 1',
                instruction: '<h1>Instruction</h1>',
                start_code: 'function main() {}',
                basic_tests: 'main()',
                full_tests: 'main()',
                level: 5,
                user_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tasks', null, {});
    }
};
