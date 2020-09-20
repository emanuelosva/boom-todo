/**
 * **************************
 * @fileoverview App env vars
 * **************************
 */

import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
  app: {
    port: process.env.PORT || 3000,
    dev: process.env.NODE_ENV !== 'production',
  },
  auth: {
    secret: process.env.JWT_SECRET,
    apiRoute: process.env.AUTH_API_ROUTE
  },
}
