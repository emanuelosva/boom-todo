/**
 * **************************
 * @fileoverview App settings
 * **************************
 */

export const config = {
  app: {
    port: process.env.PORT,
    dev: process.env.NODE_ENV !== 'production',
  },
  api: {
    url: 'http:localhost:5000/v1',
  }
};
