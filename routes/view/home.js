const express = require('express');
const router = express.Router();
const articleController = require('../../controllers/articleController.js');

router.get('/', articleController.renderHome);
router.get('/saved', articleController.renderSaved);

module.exports = router;
