/**
 * **********************************
 * @fileoverview Error Handler module
 * **********************************
 */

import express from 'express'
import debug from 'debug'
import { ErrorResponse } from '../lib/errorClass'
import { responseError } from '../network/response'

const errorLogger = debug('app:Error')

/**
 * Send a Json with the error to client
 * @param err - Error
 * @param req - Request Objecte
 * @param res - Response Object
 * @param next - Next Function
 */
export const errorHandler = (
  err: ErrorResponse,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  const status = err.statusCode || 500
  const detail = err.message

  // Log only on development
  errorLogger('Error', err.message)
  errorLogger('Error', err.stack)

  // Send email on logic error
  if (!err.clientError) {
    // Todo
    errorLogger('Send email')
  }

  responseError(res, status, detail)
}
