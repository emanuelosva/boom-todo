/**
 * *****************************************
 * @fileoverview Homogenized Response module
 * *****************************************
 */

import express from 'express'

const STATUS_DETAILS: Record<string, string> = {
  '200': 'Ok',
  '201': 'Record created',
  '204': 'Success operation',
  '400': 'Bad request',
  '401': 'Invalid credentials',
  '403': 'Forbiden',
  '404': 'Not found',
  '405': 'Method not allowed',
  '409': 'Conflict',
  '500': 'Server error',
};

/**
 * Server Success Response
 * @param res - Express Response
 * @param data - The data to return
 * @param status - The HTTP status code
 * @param detail - The response message
 */
export const responseSuccess = (
  res: express.Response,
  data: unknown,
  status: number,
  detail: string,
): void => {
  const statusCode = status || res.statusCode || 200
  const statusDetail = detail || res.statusMessage || STATUS_DETAILS[statusCode]

  res
    .status(statusCode)
    .json({
      error: false,
      detail: statusDetail,
      data,
    })
}


/**
 * 
 * @param res - Express Response
 * @param status - The HTTP status code
 * @param detail - The response message
 */
export const responseError = (
  res: express.Response,
  status: number,
  detail: string,
): void => {
  const statusCode = status || res.statusCode || 500
  const statusDetail = detail || res.statusMessage || STATUS_DETAILS[statusCode]

  res
    .status(statusCode)
    .json({
      error: true,
      detail: statusDetail,
      data: {},
    })
}
