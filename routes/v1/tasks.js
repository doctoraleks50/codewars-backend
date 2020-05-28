const express = require('express');
const container = require('../../di');


const router = express.Router();

router.get('', container.TasksController.list.bind(container.TasksController));
router.post('', container.TasksController.create.bind(container.TasksController));
router.get('/random', container.TasksController.getRandom.bind(container.TasksController));
router.get('/:id', container.TasksController.get.bind(container.TasksController));
router.put('/:id', container.TasksController.update.bind(container.TasksController));
router.delete('/:id', container.TasksController.delete.bind(container.TasksController));

router.get('/:task_id/solutions', container.SolutionsController.list.bind(container.SolutionsController));
router.post('/:task_id/solutions/check', container.SolutionsController.check.bind(container.SolutionsController));
router.post('/:task_id/solutions', container.SolutionsController.create.bind(container.SolutionsController));
router.get('/:task_id/solutions/:id', container.SolutionsController.get.bind(container.SolutionsController));
router.put('/:task_id/solutions/:id', container.SolutionsController.update.bind(container.SolutionsController));
router.delete('/:task_id/solutions/:id', container.SolutionsController.delete.bind(container.SolutionsController));

module.exports = router;
