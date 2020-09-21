/**
 * *********************************
 * @fileoverview Auth util functions
 * *********************************
 */

import jwt from 'jsonwebtoken'
import { config } from '../../config'
import { ErrorResponse } from '../../lib/errorClass'

const { secret } = config.auth

export interface tokenPayload {
  userId: number
}

/**
 * Return a encoded jwt
 * @param payload - The data to sign into the jwt
 */
export const getToken = (payload: tokenPayload): string => {
  const token = jwt.sign(payload, secret)
  return token
}


export const verifyToken = (token: string): tokenPayload => {
  const payload = jwt.verify(token, secret) as tokenPayload
  return payload
}
