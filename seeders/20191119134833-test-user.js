'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'example@example.org',
                google_id: '',
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
