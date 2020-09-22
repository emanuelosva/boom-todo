/**
 * **************************
 * @fileoverview Logout Route
 * **************************
 */

import { config } from '../../config';

export async function post(req, res) {

  // Remove session cookies
  res.cookie('token', null, {
    maxAge: 0,
    httpOnly: !config.app.dev,
    secure: !config.app.dev,
  });
  res.cookie('user', null, {
    maxAge: 0,
    httpOnly: !config.app.dev,
    secure: !config.app.dev,
  });

  res.status(200).json({ detail: 'Logout' }).end();
};
