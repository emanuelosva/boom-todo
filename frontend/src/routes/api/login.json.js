/**
 * *************************
 * @fileoverview Login Route
 * *************************
 */

import axios from 'axios';
import { config } from '../../config';

export async function post(req, res) {
  try {
    const { email, password } = req.body;

    // Make a login to the API
    const { data } = await axios({
      method: 'POST',
      url: `${config.api.url}/users/login`,
      data: { email, password }
    });

    const { user, token } = data.data;

    // Set token and user Id on cookies to manage session
    res.cookie('token', token, {
      maxAge: config.app.sessionTime, // 2 Days
      httpOnly: !config.app.dev,
      secure: !config.app.dev,
    });
    res.cookie('user', user.id, {
      maxAge: config.app.sessionTime, // 2 Days
      httpOnly: !config.app.dev,
      secure: !config.app.dev,
    });

    res.status(200).json({ user, token }).end();
  } catch (error) {
    const { status, data } = error.response;
    return res.status(status).json(data).end();
  }
};
