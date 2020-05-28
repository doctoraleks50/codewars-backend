class TasksController {
    constructor(tasksRepository, nextRandomTask) {
        this.tasksRepository = tasksRepository;
        this.nextRandomTask = nextRandomTask;
    }

    /**
     * @api {get} /api/v1/tasks/:id
     * @apiName Get by ID
     * @apiGroup Tasks
     * @apiDescription Returns task by id
     *
     * @apiParam {Number} id task unique ID
     */
    get(req, res) {
        this.tasksRepository.getById(req.params.id).then(result => {
            res.status(200).json(result)
        });
    }

    /**
     * @api {get} /api/v1/tasks
     * @apiName List
     * @apiGroup Tasks
     * @apiDescription Returns list of tasks
     *
     * @apiParam {Number} page
     * @apiParam {Number} perPage
     * @apiParam {String} sortField
     * @apiParam {String} orderField
     * @apiParam {String} search
     */
    list(req, res) {
        this.tasksRepository.list(req.query).then(result =>
            res.status(200).json(result));
    }

    /**@api {post} /api/v1/tasks
     * @apiName Create
     * @apiGroup Tasks
     * @apiDescription create task
     *
     * @apiParam {String} title
     * @apiParam {String} instruction
     * @apiParam {String} start_code
     * @apiParam {String} basic_tests
     * @apiParam {String} full_tests
     * @apiParam {String} user_id
     * @apiParam {String} level
     */
    create(req, res) {
        this.tasksRepository.create(
            Object.assign({user_id: req.user.id}, req.body))
            .then(result =>
                res.status(200).json(result));
    }

    /**@api {post} /api/v1/tasks/:id
     * @apiName Update
     * @apiGroup Tasks
     * @apiDescription update task
     *
     * @apiParam {Number} id task unique ID
     * @apiParam {String} title
     * @apiParam {String} instruction
     * @apiParam {String} start_code
     * @apiParam {String} basic_tests
     * @apiParam {String} full_tests
     * @apiParam {String} user_id
     * @apiParam {String} level
     */
    update(req, res) {
        this.tasksRepository.update(req.params.id, req.body).then(result =>
            res.status(200).json(result));
    }

    /**@api {post} /api/v1/tasks/:id
     * @apiName Delete
     * @apiGroup Tasks
     * @apiDescription delete task by id
     *
     * @apiParam {Number} id task unique ID
     */
    delete(req, res) {
        this.tasksRepository.delete(req.params.id).then(result =>
            res.status(200).json(result));
    }

    getRandom(req, res) {
        this.nextRandomTask.getRandomTask(req.user.id).then(result => {
            if (!result) {
                return res.status(404).send('No task')
            } else {
                return res.status(200).json(result)
            }
        });
    }

}

module.exports = TasksController;
