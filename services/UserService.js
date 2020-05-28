class UserService {
    constructor(database, userCalculator) {
        this.database = database;
        this.userCalculator = userCalculator;
    }

    async getInfo(user_id) {
        const solutions = await this.database.Solution.findAll({
            where: {
                user_id: user_id
            },
            include: [{
                model: this.database.Task,
                required: true
            }],
            attributes: ['task_id'],
            group: ['task_id']
        });
        const solutionsId = solutions.map(item => item.task_id);
        const experience = this.userCalculator.getExp(solutions.map(item => item.Task.level));
        const level = this.userCalculator.getLevel(experience);
        return {
            experience,
            level,
            solutionsId
        }
    }

}

module.exports = UserService;
