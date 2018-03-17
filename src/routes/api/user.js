import express from 'express'
import * as userController from '../../controllers/userController'

const router = express.Router()

router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUserById)
router.delete('/:id', userController.deleteUserById)

module.exports = router
