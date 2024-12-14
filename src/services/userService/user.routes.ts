
import Express from 'express'
import UserController from './user.controllers'

const userRouter = Express.Router()

userRouter.route(`/check/user/status/:id`).all().get(UserController.checkUserRegistrationStatus)
export default userRouter

