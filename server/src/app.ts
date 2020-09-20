/**
 * ******************************************
 * @fileoverview App Instance & Configuration
 * @description Settings and configurations for
 *              the app instance.
 * ******************************************
 */

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import { apiRouter } from './network/router'
import { notFoundHandler, errorHandler } from './middleware'
import { User } from '@prisma/client'

/**
 * Express app instance
 */
declare module 'express' {
  interface Request {
    user?: User
  }
}
export const app: express.Application = express()

/**
 * App logger
 */
app.use(morgan('tiny'))

/**
 * Security
 */
app.use(helmet())
app.use(cors())

/**
 * Parsers
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/**
 * Api Routes
 */
app.use('/v1', apiRouter)

/**
 * Error Handler
 */
app.use(notFoundHandler)
app.use(errorHandler)
