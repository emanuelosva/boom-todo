/**
 * *****************************************
 * @fileoverview Helper for fetch api routes
 * *****************************************
 */

import axios from 'axios';
import { config } from '../config';

/**
 * 
 * @param {string} path - The endpoint to fetch
 * @param {string} method - The http method
 * @param {object} body - The request body
 * @param {string} token - The JWT if the route is protected
 */
export const fetchApiFunc = async (path, method, body, token) => {
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

class FetchApi {
  constructor() {
    this.fetch = fetchApiFunc;
  }
  async get(path, token = undefined) {
    return this.fetch(path, 'GET', {}, token)
  }
  async post(path, body, token = undefined) {
    return this.fetch(path, 'POST', body, token)
  }
  async put(path, body, token = undefined) {
    return this.fetch(path, 'PUT', body, token)
  }
  async patch(path, body, token = undefined) {
    return this.fetch(path, 'PATCH', body, token)
  }
  async delete(path, body, token = undefined) {
    return this.fetch(path, 'DELETE', body, token)
  }
}

export const fetchApi = new FetchApi()

export const logout = async () => {
  const { status } = await fetch("/api/logout.json", { method: "POST" })
  if (status) {
    window.location.href = "/login";
  }
};
