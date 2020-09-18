/**
 * **************************************
 * @fileoverview Not Found Handler module
 * **************************************
 */

import express from 'express'
import { responseError } from '../network/response'

export const notFoundHandler = (
  req: express.Request,
  res: express.Response,
): void => {
  responseError(res, 404, 'Not found')
}
