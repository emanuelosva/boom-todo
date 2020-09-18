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

import { notFoundHandler, errorHandler } from './middleware'

/**
 * Express app instance
 */
const app: express.Application = express()

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
 * Error Handler
 */
app.use(notFoundHandler)
app.use(errorHandler)

/**
 * Export app instance to separte from launch server file
 */
module.exports = app
