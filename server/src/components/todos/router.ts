/**
 * **************************
 * @fileoverview Todos Router
 * **************************
 */

import express, { Request, Response, NextFunction } from 'express'
import { TodoUpdateInput } from '@prisma/client'
import { validationHandler } from '../../middleware'
import { authenticateBearer } from '../../lib/auth/strategys/bearer.strategy'
import { responseSuccess } from '../../network/response'
import { TodoController } from './controller'
import {
  todoCreateSchema,
  todoUpdateSchema,
  idSchema
} from './schemas'

/**
 * Router
 */
export const router = express.Router()
router.use(authenticateBearer())
const todoController = new TodoController()

/**
 * Model Docs are defined in ./api.docs.ts
 */

/**
 * Create a new Todo
 * @route POST /todos
 * @group Todos - Operations about todo
 * @param {TodoCreate.model} todo.body.required - The todo info
 * @returns {TodoResponse.model} 201 - Todo Response
 * @returns {BadRequetsError.model} 400 - Bad Request Error
 * @returns {UnauthorizedError.model} 401 - Unauthorized Error
 * @security JWT
 */
router.post(
  '/',
  validationHandler(todoCreateSchema, { check: 'body' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, tag, dateTodo } = req.body
      const { user } = req
      const id = Number(user?.id)
      const todo = await todoController.create(id, {
        title, content, tag, dateTodo: new Date(dateTodo)
      })
      responseSuccess(res, todo, 201, 'Todo created')
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Get all Todos of the current user
 * @route GET /todos/all
 * @group Todos - Operations about todo
 * @returns {TodoResponseList.model} 200 - Todo List Response
 * @returns {BadRequetsError.model} 400 - Bad Request Error
 * @returns {UnauthorizedError.model} 401 - Unauthorized Error
 * @security JWT
 */
router.get(
  '/all',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req
      const userId = Number(user?.id)
      const todoList = await todoController.get({ id: userId }) || []
      responseSuccess(res, todoList, 200, 'Todos retrieved')
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Get all Todos of the current user
 * @route GET /todos/{id}
 * @group Todos - Operations about todo
 * @param {number} id.path.required - The todo id - eg: 114
 * @returns {TodoResponse.model} 200 - Todo List Response
 * @returns {BadRequetsError.model} 400 - Bad Request Error
 * @returns {UnauthorizedError.model} 401 - Unauthorized Error
 * @returns {NotFoundError.model} 404 - Not Found Error
 * @security JWT
 */
router.get(
  '/:id',
  validationHandler(idSchema, { check: 'params' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const todo = await todoController.getOne({ id: Number(id) })
      responseSuccess(res, todo, 200, 'Todo retrieved')
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Update a todo
 * @route PUT /todos/{id}
 * @group Todos - Operations about todo
 * @param {number} id.path.required - The todo id - eg: 1
 * @param {TodoUpdate.model} todo.body.required - The todo info
 * @returns {TodoResponse.model} 200 - Todo Updated
 * @returns {BadRequetsError.model} 400 - Bad Request Error
 * @returns {UnauthorizedError.model} 401 - Unauthorized Error
 * @returns {ConflictError.model} 409 - Conflict Error
 * @security JWT
 */
router.put(
  '/:id',
  validationHandler(idSchema, { check: 'params' }),
  validationHandler(todoUpdateSchema, { check: 'body' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const updateTodoData = req.body as TodoUpdateInput
      const todo = await todoController.update({ id: Number(id) }, updateTodoData)
      responseSuccess(res, todo, 200, 'Todo updated')
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Delete a todo
 * @route DELETE /todos/{id}
 * @group Todos - Operations about todo
 * @param {number} id.path.required - The todo id - eg: 1
 * @returns {TodoResponse.model} 200 - Todo Updated
 * @returns {UnauthorizedError.model} 401 - Unauthorized Error
 * @returns {ConflictError.model} 409 - Conflict Error
 * @security JWT
 */
router.delete(
  '/:id',
  validationHandler(idSchema, { check: 'params' }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const todo = await todoController.delete({ id: Number(id) })
      responseSuccess(res, todo, 200, 'Todo deleted')
    } catch (error) {
      next(error)
    }
  }
)
