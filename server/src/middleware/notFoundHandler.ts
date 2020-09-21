/**
 * **************************************
 * @fileoverview Not Found Handler module
 * **************************************
 */

import express from 'express'
import { responseError } from '../network/response'

/**
 * Send a message of `Not found` to client when any route matches
 * the request path
 *
 * @param req - Request Object
 * @param res - Response Object
 */
export const notFoundHandler = (
  req: express.Request,
  res: express.Response,
): void => {
  responseError(res, 404, 'Not found')
}
