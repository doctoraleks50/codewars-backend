'use strict';
module.exports = (sequelize, DataTypes) => {
    const Solution = sequelize.define('Solution', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        code: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        task_id: DataTypes.INTEGER
    }, {
        tableName: 'solutions',
        timestamps: true,
        underscored: true
    });
    Solution.associate = function (models) {
        Solution.belongsTo(models.Task, {
            foreignKey: 'task_id'
        });
        Solution.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };
    return Solution;
};
