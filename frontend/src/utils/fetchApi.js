/**
 * *****************************************
 * @fileoverview Helper for fetch api routes
 * *****************************************
 */

import axios from 'axios';
import { config } from '../config';

export const fetchApi = async (path, method, body, token) => {
  try {
    const { data, status } = await axios({
      url: `${config.api.url}${path}`,
      method,
      data: body,
      headers: { Authorization: `Bearer ${token}` }
    });
    return { data, status };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status }
  }
};
