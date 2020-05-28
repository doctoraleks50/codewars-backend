const express = require('express');
const container = require('../../di');


const router = express.Router();

router.get('/profile', container.UsersController.getProfile.bind(container.UsersController));
router.get('/:id(\d+)', container.UsersController.get.bind(container.UsersController));
router.put('/:id/update', container.UsersController.update.bind(container.UsersController));


module.exports = router;
