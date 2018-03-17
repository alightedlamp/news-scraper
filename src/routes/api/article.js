import express from 'express'

import * as articleController from '../../controllers/articleController'

const router = express.Router()

router.get('/all', articleController.getAllArticles)
router.get('/scrape', articleController.populate)
router.get('/:id', articleController.getArticleById)

module.exports = router
