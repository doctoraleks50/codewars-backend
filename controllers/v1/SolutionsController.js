class SolutionsController {
    constructor(solutionsRepository, codeRunner) {
        this.solutionsRepository = solutionsRepository;
        this.codeRunner = codeRunner;
    }

    /**
     * @api {get} /api/v1/:task_id/solutions
     * @apiName Get by ID
     * @apiGroup Solutions
     * @apiDescription Returns solutions by task id
     *
     * @apiParam {Number} task_id unique task ID for solution
     */
    get(req, res) {
        this.solutionsRepository.getById(req.params.task_id)
            .then(result =>
                res.status(200).json(result));
    }

    /**
     * @api {get} /api/v1/:task_id/solutions
     * @apiName List
     * @apiGroup Solutions
     * @apiDescription Returns list of tasks
     *
     * @apiParam {Number} task_id unique task ID for solution
     * @apiParam {Number} page
     * @apiParam {Number} perPage
     * @apiParam {String} sortField
     * @apiParam {String} orderField
     */
    list(req, res) {
        this.solutionsRepository.list(Object.assign({}, req.query, req.params))
            .then(result =>
                res.status(200).json(result));
    }

    /**@api {post} /api/v1/:task_id/solutions/check
     * @apiName Check
     * @apiGroup Tasks
     * @apiDescription check task
     *
     * @apiParam {Number} task_id unique task ID for solution
     * @apiParam {String} code
     */
    async check(req, res) {
        try {
            const execResults = await this.codeRunner.exec({
                user_id: req.user.id,
                task_id: req.params.task_id,
                code: req.body.code,
                testType: req.body.testType
            });
            if (execResults.status === 0) {
                res.status(200).json(execResults.status)
            }
            res.status(200).json(execResults.stderr.toString())
        } catch (err) {
            res.status(500).send(err)
        }
    }

    /**@api {post} /api/v1/:task_id/solutions
     * @apiName Create
     * @apiGroup Tasks
     * @apiDescription create task
     *
     * @apiParam {Number} task_id unique task ID for solution
     * @apiParam {String} code
     */
    async create(req, res) {
        try {
            const result = await this.solutionsRepository.create(
                Object.assign({
                    user_id: req.user.id,
                    task_id: req.params.task_id,
                }, req.body)
            )
            res.status(200).json(result.dataValues)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    /**@api {post} /api/v1/:task_id/solutions/:id
     * @apiName Update
     * @apiGroup Tasks
     * @apiDescription update task
     *
     * @apiParam {Number} task_id unique task ID for solution
     * @apiParam {Number} id solution unique ID
     * @apiParam {String} code
     */
    update(req, res) {
        this.solutionsRepository.update(req.params.id, req.body)
            .then(result =>
                res.status(200).json(result));
    }

    /**@api {post} /api/v1/:task_id/solutions/:id
     * @apiName Delete
     * @apiGroup Tasks
     * @apiDescription delete task by id
     *
     * @apiParam {Number} task_id unique task ID for solution
     * @apiParam {Number} id solution unique ID
     */
    delete(req, res) {
        this.solutionsRepository.delete(req.params.id)
            .then(result =>
                res.status(200).json(result));
    }

}

module.exports = SolutionsController;
