const express = require('express');
const ExampleController = require('../../controllers/v1/ExampleController');

const router = express.Router();

router.get('/:id', ExampleController.get.bind(ExampleController));
router.get('', ExampleController.list.bind(ExampleController));

module.exports = router;