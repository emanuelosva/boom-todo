/**
 * ****************************************************************
 * @fileoverview Middleware for check the schema of request payload
 * ****************************************************************
 */


import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '../lib/errorClass'

/**
 * Validate the request data with the defined Joi schema
 * @param schema - The joi schema to validate the request
 * @param data - The data in request
 */
const validateSchema = async (
  schema: Joi.Schema,
  data: unknown): Promise<Joi.ValidationError | undefined> => {
  try {
    await schema.validateAsync(data)
  } catch (error) {
    return error
  }
}

/**
 * Veificate if the request data match with the defined schema.
 * If an error occurs a exception is launched and the error is
 * porccessed by the error middleware handler
 * 
 * @param schema - The joi schema to validate the request
 * @param checkLocation - The request data location
 */
export const validationHandler = (
  schema: Joi.Schema,
  checkLocation: { check: string },
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { check } = checkLocation
    let data: unknown

    if (check === 'body') data = req.body
    if (check === 'params') data = req.params
    if (check === 'query') data = req.query

    const error = await validateSchema(schema, data)
    error
      ? next(new ErrorResponse(400, error.message))
      : next()
  }
}
