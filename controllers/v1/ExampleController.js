const services = require('../../services');

class ExampleController {
    constructor(exampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    /**
     * @api {get} /api/v1/example/:id
     * @apiName Get Example
     * @apiGroup Example
     *
     * @apiParam {Number} id unique user ID
     */
    get(req, res) {
        const result = this.exampleRepository.getById(req.params.id);

        res.status(200).json(result);
    }

    /**
     * @api {get} /api/v1/example
     * @apiName Get by ID
     * @apiGroup Example
     *
     * @apiParam {Number} id unique user ID
     */
    list(req, res) {
        res.status(200).json([
            {
                id: 1
            },
            {
                id: 2
            }
        ])
    }
}

module.exports = new ExampleController(services.ExampleRepository);