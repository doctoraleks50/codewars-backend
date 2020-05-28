const Op = require('sequelize').Op;

class TasksRepository {
    constructor(database) {
        this.database = database;
    }

    getById(id) {
        return this.database.Task.findByPk(id);
    }

    list(filters) {
        const page = +filters.page || 1;
        const perPage = +filters.perPage || 10;
        const sortField = filters.sortField || "id";
        const orderField = filters.orderField || "DESC";
        const keyword = filters.search || "";

        return this.database.Task.findAll({
            where: {
                title: {
                    [Op.like]: `%${keyword}%`
                }
            },
            order: [
                [sortField, orderField]
            ],
            offset: (page - 1) * perPage,
            limit: perPage,
        })
    }

    create(data) {
        return this.database.Task.create(data);
    }

    update(id, data) {
        return this.database.Task.update({
                title: data.title,
                instruction: data.instruction,
                start_code: data.start_code,
                basic_tests: data.basic_tests,
                full_tests: data.full_tests,
                level: data.level
            },
            {where: {id: id}});
    }

    delete(id) {
        return this.database.Task.destroy({where: {id: id}});
    }
}

module.exports = TasksRepository;
