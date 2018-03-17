import express from 'express'
import * as commentController from '../../controllers/commentController'

const router = express.Router()

// API routes
// ////////////////////////////

router.get('/:id', commentController.getCommentById)
router.get('/all/:articleId', commentController.getAllComments)
router.post('/new', commentController.postNewComment)
router.put('/:id', commentController.editComment)
router.delete('/:id', commentController.deleteComment)

module.exports = router
