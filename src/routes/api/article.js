import express from 'express'

import * as articleController from '../../controllers/articleController'

import { ensureAuthenticated } from '../../shared/helpers'

const router = express.Router()

router.get('/all', articleController.getAllArticles)
router.get('/scrape', articleController.populate)
router.get('/:id', articleController.getArticleById)
router.get('/user', ensureAuthenticated, articleController.getUserArticles)

module.exports = router
