/**
 * **********************************
 * @fileoverview Error Handler module
 * **********************************
 */

import express from 'express'
import { ErrorResponse } from '../lib/errorClass'
import { responseError } from '../network/response'

export const errorHandler = (
  err: ErrorResponse,
  req: express.Request,
  res: express.Response,
): void => {
  const status = err.statusCode || 500
  const detail = err.message

  responseError(res, status, detail)
}
