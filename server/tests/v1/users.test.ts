/**
 * *******************************
 * @fileoverview Users Tests
 * *******************************
 */

import supertest from 'supertest'
import { app } from '../../src/app'

describe('Users Endpoints', () => {
  const request = supertest(app)

  let userId: number
  const newUser = { name: 'Stan', email: 'stanT@marvel.com', password: 'user123' }

  describe('POST /users/signup', () => {

    test.skip('Should return the user and token with status 201', async (done) => {
      const response = await request
        .post('/v1/users/signup')
        .set('Accept', 'application/json')
        .send({ ...newUser })

      const { body, status } = response

      expect(status).toEqual(201)
      expect(body.error).toBeFalsy()
      expect(body.detail).toEqual('User created & logged')
      expect(typeof body.data.token).toBe('string')
      expect(typeof body.data.user.id).toBe('number')

      userId = body.data.user.id
      done()
    })

    test('Should return a status 409 if email already exists', async (done) => {
      const response = await request
        .post('/v1/users/signup')
        .set('Accept', 'application/json')
        .send({ ...newUser })

      const { body, status } = response

      expect(status).toEqual(409)
      expect(body.error).toBeTruthy()
      expect(body.detail).toEqual('Email already exists')
      done()
    })

    test('Should return a status 400 on bad request payload', async (done) => {
      const response = await request
        .post('/v1/users/signup')
        .set('Accept', 'application/json')
        .send({ name: '', email: 25, password: '' })

      const { body, status } = response

      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

  })

  describe('POST /users/login', () => {

    test('Should response with token & user info', async (done) => {
      const { email, password } = newUser

      const response = await request
        .post('/v1/users/login')
        .set('Accept', 'application/json')
        .send({ email, password })

      const { body, status } = response

      expect(status).toEqual(200)
      expect(body.error).toBeFalsy()
      expect(body.detail).toEqual('Login success')
      expect(typeof body.data.token).toBe('string')
      expect(typeof body.data.user).toBe('object')
      expect(body.data.user.id).toEqual(5)
      done()
    })

    test('Should return a 401 error on invalid credentials', async (done) => {
      const { email } = newUser

      const response = await request
        .post('/v1/users/login')
        .set('Accept', 'application/json')
        .send({ email, password: 'invalid' })

      const { body, status } = response

      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      expect(body.detail).toEqual('Invalid credentials')
      expect(body.data.token).toBeFalsy()
      done()
    })

    test('Should return a status 400 on bad request payload', async (done) => {
      const response = await request
        .post('/v1/users/signup')
        .set('Accept', 'application/json')
        .send({ name: '', email: 25, password: '' })

      const { body, status } = response

      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

  })

})
