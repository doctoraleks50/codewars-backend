class SolutionsRepository {
    constructor(database) {
        this.database = database;
    }

    getById(id) {
        return this.database.Solution.findByPk(id);
    }

    list(filters) {
        const page = +filters.page || 1;
        const perPage = +filters.perPage || 10;
        const sortField = filters.sortField || "id";
        const order = filters.order || "DESC";
        
        return this.database.Solution.findAll({
            where:
                { task_id: filters.task_id },

            order: [
                [sortField, order]
            ],
            offset: (page - 1) * perPage,
            limit: perPage
        })
    }

    create(data) {
        return this.database.Solution.create(data);
    }

    update(id, data) {
        return this.database.Solution.update({ code: data.code },
            { where: 
                { id: id } });
    }
    delete(id) {
        return this.database.Solution.destroy({
            where:
                { id: id }
        });
    }
}

module.exports = SolutionsRepository;
