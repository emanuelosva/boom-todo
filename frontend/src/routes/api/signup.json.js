/**
 * **************************
 * @fileoverview Signup Route
 * **************************
 */

import axios from 'axios';
import { config } from '../../config';

export async function post(req, res) {
  try {
    const { name, email, password } = req.body;

    // Make a signup to the API
    const { data } = await axios({
      method: 'POST',
      url: `${config.api.url}/users/signup`,
      data: { name, email, password }
    });
    const { user, token } = data.data;

    res.cookie('token', token, {
      maxAge: config.app.sessionTime, // 2 Days
      httpOnly: !config.app.dev,
      secure: !config.app.dev,
    });
    res.cookie('user', user.id, {
      maxAge: 7200 * 1000,
      httpOnly: !config.app.dev,
      secure: !config.app.dev,
    });

    res.status(201).json({ user, token }).end();
  } catch (error) {
    const { status, data } = error.response;
    res.status(status).json(data).end();
  }
};

