import express from 'express'

import * as articleController from '../../controllers/articleController'

const router = express.Router()

router.get('/:id', articleController.renderOne)
router.get('/all', articleController.renderAll)

module.exports = router
