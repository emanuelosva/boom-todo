/**
 * **************************
 * @fileoverview App settings
 * **************************
 */

const isDevMode = process.env.NODE_ENV !== 'production';

export const config = {
  app: {
    port: process.env.PORT,
    dev: isDevMode,
    sessionTime: 2 * 24 * 3600 * 1000, // 2 Days
  },
  api: {
    url: isDevMode ? 'http://localhost:5000/v1' : '/v1',
  }
};
