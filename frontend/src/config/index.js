/**
 * **************************
 * @fileoverview App settings
 * **************************
 */

export const config = {
  app: {
    port: process.env.PORT,
    dev: process.env.NODE_ENV !== 'production',
    sessionTime: 2 * 24 * 3600 * 1000, // 2 Days
  },
  api: {
    url: 'http://localhost:5000/v1',
  }
};
