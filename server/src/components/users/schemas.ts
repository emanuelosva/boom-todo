/**
 * *************************************
 * @fileoverview User validation schemas
 * *************************************
 */

import Joi from 'joi'

/**
 * Single field for query/params
 */
export const idSchema = Joi.number().min(1)
export const emailSchema = Joi.string().email()

/**
 * Objet Schema for Body Requests
 */
const userInput = Joi.object({
  name: Joi.string().min(2).max(128).alter({
    create: schema => schema.required(),
    update: schema => schema.optional(),
    login: schema => schema.disallow(),
  }),
  email: Joi.string().email().alter({
    create: schema => schema.required(),
    update: schema => schema.optional(),
    login: schema => schema.required()
  }),
  password: Joi.string().min(6).max(128).alter({
    create: schema => schema.required(),
    update: schema => schema.optional(),
    login: schema => schema.required(),
  }),
})

/**
 * Create spefici schemas
 */
export const userCreateSchema = userInput.tailor('create')
export const userUpdateSchema = userInput.tailor('update')
export const userLoginSchema = userInput.tailor('login')
