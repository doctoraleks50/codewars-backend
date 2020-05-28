'use strict';
module.exports = (sequelize, dataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        title: dataTypes.STRING,
        instruction: dataTypes.TEXT,
        start_code: dataTypes.STRING,
        basic_tests: dataTypes.STRING,
        full_tests: dataTypes.STRING,
        user_id: dataTypes.INTEGER,
        level: dataTypes.INTEGER.UNSIGNED
    }, {
        tableName: 'tasks',
        timestamps: true,
        underscored: true
    });
    Task.associate = function (models) {
        Task.hasMany(models.Solution, {
            foreignKey: 'task_id'
        });
    };
    return Task;
};
