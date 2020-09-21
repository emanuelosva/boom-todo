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
import {
  userCreateSchema,
  userUpdateSchema,
  userLoginSchema,
  idSchema
} from './schemas'

/**
 * Router
 */
export const router = express.Router()
const userController = new UserController()

/**
 * Model Docs are defined in ./api.docs.ts
 */

/**
 * Register a new user
 * @route POST /users/signup
 * @group Users - Operations about user
 * @param {UserCreate.model} user.body.required - The user data
 * @returns {AuthResponse.model} 201 - User created & logged
 * @returns {GeneralError.model}  default - Response Error
 */
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

/**
 * Login a user. Return the user data and a valid JWT
 * @route POST /users/login
 * @group Users - Operations about user
 * @param {UserLogin.model} credentials.body.required
 * @returns {AuthResponse.model} 200 - Login Response
 * @returns {BadRequetsError.model} 400 - Bad Request
 * @returns {UnauthorizedError.model} 401 - Unauthorized
 */
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

/**
 * Get the info of the curret user
 * @route GET /users/current
 * @group Users - Operations about user
 * @returns {UserResponse.model} 200 - Curent user info
 * @returns {UnauthorizedError.model} 401 - Unauthorized response
 * @security JWT
 */
router.get(
  '/current',
  authenticateBearer(),
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req
    if (!user) return next(new ErrorResponse(401, ''))
    responseSuccess(res, user, 200, 'Current user info')
  }
)

/**
 * Update a existing user
 * @route PUT /users/:id
 * @group Users - Operations about user
 * @param {number} id.params.required - User id - eg: 114
 * @param {UserUpdate.model} userData.body - User data
 * @returns {UserResponse.model} 200 - The updated user info
 * @returns {BadRequetsError.model} 400 - Bad Request
 * @returns {UnauthorizedError.model} 401 - Unauthorized
 * @security JWT
 */
router.put(
  '/:id',
  authenticateBearer(),
  validationHandler(idSchema, { check: 'params' }),
  validationHandler(userUpdateSchema, { check: 'body' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { name, email, password } = req.body
      const user = await userController.update(
        { id: Number(id) },
        { name, email, password }
      )
      responseSuccess(res, user, 200, 'User updated')
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Delete a existing user
 * @route DELETE /users/:id
 * @group Users - Operations about user
 * @param {number} id.params.required - user id - eg: 47
 * @returns {UserResponse.model} 200 - The updated user info
 * @returns {BadRequetsError.model} 400 - Bad Request
 * @returns {UnauthorizedError.model} 401 - Unauthorized
 * @security JWT
 */
router.delete(
  '/:id',
  authenticateBearer(),
  validationHandler(idSchema, { check: 'params' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const user = await userController.delete({ id: Number(id) })
      responseSuccess(res, user, 200, 'User deleted')
    } catch (error) {
      next(error)
    }
  }
)
