import express from 'express'
import * as commentController from '../../controllers/commentController'

const router = express.Router()

router.get('/:id', commentController.getCommentById)
router.post('/new', commentController.postNewComment)
router.put('/:id', commentController.editComment)
router.delete('/:id', commentController.deleteComment)

module.exports = router
