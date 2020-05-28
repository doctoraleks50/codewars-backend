class UsersRepository {
    constructor(database) {
        this.database = database;
    }

    getById(id) {
        return this.database.User.findByPk(id);
    }
    getByGoogleId(id) {
        return this.database.User.findOne({ where: { google_id: id } });
    }
    list() {
        return this.database.User.findAll();
    }
    create(data) {
        return this.database.User.create({
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            google_id: data.googleId,
        });
    }
    update(id, data) {
        return this.database.User.update({
            first_name: data.firstName,
            last_name: data.lastName
        },
        { where: { id: id } });
    }
    delete(id) {
        return this.database.User.destroy({ where: { id: id } });
    }
}

module.exports = UsersRepository;
