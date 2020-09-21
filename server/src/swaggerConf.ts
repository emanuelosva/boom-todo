/**
 * ************************************
 * @fileoverview Swagger configurations
 * ************************************
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const expressSwagger = require('express-swagger-generator')
import express from 'express'

/**
 * General swagger settings
 */
const swaggerConf = {
  swaggerDefinition: {
    info: {
      title: 'Boom Todo',
      version: '1.0.0',
      description: 'Boom Todo Api Api documentation. Powered By: `express-swagger-generator`',
    },
    host: 'localhost:3000',
    basePath: '/v1',
    produces: [
      "application/json",
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "JWT bearer authorization.",
      }
    }
  },
  basedir: __dirname,
  files: ['./components/**/*.ts'] //Path to the API handle folder
};


/**
 * Create a swagger json file based on routes docstrings and create
 * a swagger ui interface in `host/api-docs`
 * 
 * @param app - The express server instance that going to serve Docs
 */
export const swaggerServer = (app: express.Application): void => {
  const swaggerService = expressSwagger(app)
  swaggerService(swaggerConf)
}
