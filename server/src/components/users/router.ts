/**
 * **************************
 * @fileoverview Users Router
 * **************************
 */

import express, { Request, Response, NextFunction } from 'express'
import { validationHandler } from '../../middleware'
import { responseSuccess } from '../../network/response'
import { ErrorResponse } from '../../lib/errorClass'
import { authenticateBearer } from '../../lib/auth/strategys/bearer.strategy'
import { UserController } from './controller'
import { userCreateSchema, userLoginSchema } from './schemas'

/**
 * Router
 */
export const router = express.Router()
const userController = new UserController()


router.post(
  '/signup',
  validationHandler(userCreateSchema, { check: 'body' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body
      const { user, token } = await userController.create({ name, email, password })
      responseSuccess(res, { user, token }, 201, 'User created & logged')
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/login',
  validationHandler(userLoginSchema, { check: 'body' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const { user, token } = await userController.login({ email, password })
      responseSuccess(res, { user, token }, 200, 'Login success')
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/current',
  authenticateBearer(),
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req
    if (!user) return next(new ErrorResponse(401, ''))
    responseSuccess(res, user, 200, 'Current user info')
  }
)


// router.patch(
//   '/',
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     try {
//       const { id } = req.params
//       const { name, email, password } = req.body
//       const user = await userController.update({ id, name, email, password })
//       responseSuccess(res, user, 200, 'User updated')
//     } catch (error) {
//       next(error)
//     }
//   }
// )

// router.delete(
//   '/:id',
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     try {
//       const { id } = req.params
//       const user = await userController.delete({ id })
//       responseSuccess(res, user, 200, 'User deleted')
//     } catch (error) {
//       next(error)
//     }
//   }
// )
