/**
 * *******************************************
 * @fileoverview Authorization Bearer Strategy
 * *******************************************
 */

import { Request, Response, NextFunction } from 'express'
import { PrismaDb } from '../../../db'
import { ErrorResponse } from '../../../lib/errorClass'
import { verifyToken } from '../utils'

const prisma = PrismaDb.getPrismaClient()

/**
 * Authentication middleware by Bearer strategy.
 * 
 * Extrac the JWT from the authorization header, if the token
 * is invalid or it undefined a Unauthorized error es sent, if
 * the token is valid and the user in the payload exists, then
 * the user data is set to req.user
 */
export const authenticateBearer = () => {

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { authorization } = req.headers
    if (!authorization) {
      return next(new ErrorResponse(401, ''))
    }

    const token = authorization?.split(' ')[1] || ''
    if (!token) {
      return next(new ErrorResponse(401, ''))
    }

    try {
      const { userId } = verifyToken(token)
      const user = await prisma.user.findOne({ where: { id: userId } })
      if (!user) {
        return next(new ErrorResponse(401, ''))

      }
      req.user = user
      return next()
    } catch (error) {
      req.user = null
      return next(new ErrorResponse(401, ''))
    }
  }
}
