class ExampleRepository {
    getById (id) {
        return {
            id,
            name: 'example'
        };
    }
}

module.exports = ExampleRepository;