/**
 * ********************************
 * @fileoverview Server Declaration
 * ********************************
 */

import sirv from 'sirv';
import express from 'express';
import cookieParse from 'cookie-parser';
import compression from 'compression';
import * as sapper from '@sapper/server';

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV === 'development';

/**
 * Express server instance
 */
const server = express();

/**
 * Parsers for private endpoints
 */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParse());

/**
 * Static server
 */
server.use(compression({ threshold: 0 }));
server.use(sirv('static', { dev }));

/**
 * Sapper middleware & session
 */
server.use((req, res, next) => {
  const { token, user } = req.cookies;
  return sapper.middleware({
    session: () => {
      return { token, user }
    }
  })(req, res, next)
});

/**
 * Launch Server 🚀
 */
server.listen(PORT, (err) => {
  if (err) console.log('error', err);
});
