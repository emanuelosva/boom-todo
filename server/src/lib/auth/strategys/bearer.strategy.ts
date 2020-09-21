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

export const authenticateBearer = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers
    if (!authorization) {
      next(new ErrorResponse(401, ''))
    }

    const token = authorization?.split(' ')[1] || ''
    if (!token) {
      next(new ErrorResponse(401, ''))
    }

    try {
      const { userId } = verifyToken(token)
      const user = await prisma.user.findOne({ where: { id: userId } })
      if (!user) {
        next(new ErrorResponse(401, ''))

      }
      req.user = user
      next()
    } catch (error) {
      req.user = null
      next(new ErrorResponse(401, ''))
    }
  }
}
