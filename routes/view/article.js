const express = require('express');
const router = express.Router();
const articleController = require('../../controllers/articleController');

router.get('/:id', articleController.renderOne);

module.exports = router;
