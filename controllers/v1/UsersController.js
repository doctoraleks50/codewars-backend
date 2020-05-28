class UsersController {
    constructor(usersRepository, userService) {
        this.usersRepository = usersRepository;
        this.userService = userService;
    }

    /**
     * @api {get} /api/v1/users/profile
     * @apiName Get Profile
     * @apiGroup Users
     *
     * @apiParam {Number} id
     * @apiParam {String} firstName
     * @apiParam {String} lastName
     * @apiParam {String} googleId
     */
    async getProfile(req, res) {
        if (!req.user) {
            return res.json(null)
        }
        const result = await this.userService.getInfo(req.user.id);
        res.json({
            id: req.user.id,
            firstName: req.user.first_name,
            lastName: req.user.last_name,
            googleId: req.user.google_id,
            level: result.level,
            points: result.experience,
            solutionsId: result.solutionsId
        });
    };

    /**
     * @api {get} /api/v1/google/callback
     * @apiName Get by ID
     * @apiGroup Users
     *
     * @apiParam {Number} id unique user ID
     */
    authSuccessfull(req, res) {
        res.redirect('/');
    };

    /**
     * @api {get} /api/v1/users/logout
     * @apiName Logout
     * @apiGroup Users
     */
    logout(req, res) {
        req.logout();
        res.redirect('/');
    };

    /**
     * @api {get} /api/v1/users/:id(\d+)
     * @apiName Google passport
     * @apiGroup Users
     *
     * @apiParam {Number} id unique user ID
     */
    get(req, res) {
        this.usersRepository.getById(req.params.id).then(result =>
            res.status(200).json(result));
    };

    /**
     * @api {get} /api/v1/users/:id/update
     * @apiName Update
     * @apiGroup Users
     *
     * @apiParam {Number} id unique user ID
     * @apiParam {String} firstName
     * @apiParam {String} lastName
     */
    update(req, res) {
        this.usersRepository.update(req.params.id, req.body).then(result =>
            res.status(200).json(result));
    }

}

module.exports = UsersController;
