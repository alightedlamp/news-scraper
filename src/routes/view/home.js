import express from 'express'

import * as articleController from '../../controllers/articleController'

const router = express.Router()

router.get('/', articleController.renderHome)

module.exports = router
