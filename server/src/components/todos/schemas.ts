/**
 * *************************************
 * @fileoverview Todo validation schemas
 * *************************************
 */

import Joi from 'joi'

/**
 * Single field for query/params
 */
export const idSchema = Joi.object({
  id: Joi.number().min(1)
})

/**
 * Objet Schema for Body Requests
 */
const todoInput = Joi.object({
  title: Joi.string().min(2).max(128).alter({
    create: schema => schema.required(),
    update: schema => schema.optional(),
  }),
  content: Joi.string().min(2).max(1024).alter({
    create: schema => schema.required(),
    update: schema => schema.optional(),
  }),
  completed: Joi.bool().optional(),
  isUrgent: Joi.bool().optional(),
  tag: Joi.string().allow('work', 'home', 'personal').alter({
    create: schema => schema.required(),
    update: schema => schema.optional(),
  }),
  dateTodo: Joi.date().min(new Date()).alter({
    create: schema => schema.required(),
    update: schema => schema.optional(),
  })
})

export const todoCreateSchema = todoInput.tailor('create')
export const todoUpdateSchema = todoInput.tailor('update')
