/**
 * **************************
 * @fileoverview Todos Router
 * **************************
 */

import express, { Request, Response, NextFunction } from 'express'
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
 * @returns {TodoResponse.model} 201 - User created & logged
 * @returns {BadRequetsError.model} 400 - default - Bad Request Error
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
