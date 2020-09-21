/**
 * **************************
 * @fileoverview Router layer
 * **************************
 */

import { Router } from 'express'
import { router as usersRouter } from '../components/users/router'
import { router as todosRouter } from '../components/todos/router'

/**
 * General Router instance
 */
export const apiRouter = Router()

apiRouter.use('/users', usersRouter)
apiRouter.use('/todos', todosRouter)
