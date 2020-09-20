/**
 * **************************
 * @fileoverview Users Router
 * **************************
 */

import express, { Request, Response, NextFunction } from 'express'
import { responseSuccess } from '../../network/response'
import { UserController } from './controller'

/**
 * Router
 */
export const router = express.Router()
const userController = new UserController()


router.post(
  '/signup',
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

// router.post(
//   '/login',
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     try {
//       const { email, password } = req.body
//       const { user, token } = await userController.login({ email, password })
//       responseSuccess(res, { user, token }, 200, 'Login success')
//     } catch (error) {
//       next(error)
//     }
//   }
// )

// router.get(
//   '/',
//   (
//     req: express.Request,
//     res: express.Response
//   ) => {
//     const { user } = req
//     responseSuccess(res, user, 200, 'Current user info')
//   }
// )


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
