const sequelize = require('sequelize');
const Op = sequelize.Op;


class RandomTaskGenerator {
    constructor(database, userCalculator) {
        this.database = database;
        this.userCalculator = userCalculator;
        this.currentTaskId = '';
    }

    async getRandomTask(user_id) {

        const exp = this.userCalculator.getExp(await this.database.Solution.findAll({
            where: {
                user_id: user_id
            },
            include: [{
                model: this.database.Task,
                required: true
            }],
            attributes: ['task_id'],
            group: ['task_id']
        }).map(i => i.Task.level));

        const level = this.userCalculator.getLevel(exp);

        const randomTasks = await this.database.Task.findAll({
            include: [{
                model: this.database.Solution,
                where: {
                    user_id: user_id,
                },
                required: false
            }],
            having: [
                sequelize.where(sequelize.col('task_id'), {
                    [Op.eq]: null
                }),
                sequelize.where(sequelize.col('user_id'), {
                    [Op.ne]: user_id
                }),
                sequelize.where(sequelize.col('level'), {
                    [Op.in]: [level, level - 1]
                }),
                sequelize.where(sequelize.col('id'), {
                    [Op.ne]: this.currentTaskId
                })
            ]
        });

        const random = Math.round(Math.random() * (randomTasks.length - 1));
        if (randomTasks.length > 0) {
            this.currentTaskId = randomTasks[random].id
        } else {
            const taskRandom = await this.database.Task.findAll({
                include: [{
                    model: this.database.Solution,
                    where: {
                        user_id: user_id,
                    },
                    required: false
                }],
                having: [
                    sequelize.where(sequelize.col('task_id'), {
                        [Op.eq]: null
                    }),
                    sequelize.where(sequelize.col('user_id'), {
                        [Op.ne]: user_id
                    }),
                    sequelize.where(sequelize.col('level'), {
                        [Op.in]: [level, level - 1]
                    })
                ]
            });
            if (taskRandom.length === 1) {
                Object.assign(taskRandom[0].dataValues, {lastTask: true});
                return taskRandom[0]
            } else {
                return null
            }
        }

        return randomTasks[random]
    }

}

module.exports = RandomTaskGenerator;
