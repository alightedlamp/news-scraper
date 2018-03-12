const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', userController.renderDashboard);
router.get('/:id', userController.renderProfile);
router.get('/edit/:id', userController.renderEdit);

module.exports = router;
