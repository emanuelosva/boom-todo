/**
 * *******************************
 * @fileoverview Users Tests
 * *******************************
 */

import supertest from 'supertest'
import { app } from '../../src/app'
import { getToken } from '../../src/lib/auth/utils'

describe('Users Endpoints', () => {
  const request = supertest(app)

  let userId: number
  const newUser = { name: 'Stan', email: 'stan@marvel.com', password: 'user123' }

  describe('POST /users/signup', () => {

    test('Should return the user and token with status 201', async (done) => {
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
      expect(body.data.user.id).toEqual(userId)
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

  describe('GET /users/current', () => {

    test('Should return the user info', async (done) => {
      const token = getToken({ userId })
      const response = await request
        .get('/v1/users/current')
        .set('Authorization', `Bearer ${token}`)

      const { body, status } = await response
      expect(status).toEqual(200)
      expect(body.error).toBeFalsy()
      expect(body.detail).toEqual('Current user info')
      expect(body.data.id).toEqual(userId)
      done()
    })

    test('Should return a unauthorized error if no token', async (done) => {
      const response = await request
        .get('/v1/users/current')

      const { body, status } = response
      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      expect(body.detail).toEqual('Invalid credentials')
      done()
    })
  })

  describe('PUT /users/:id', () => {

    test('Should return the updated user', async (done) => {
      const token = getToken({ userId })
      const updatedUser = { name: 'StanLee', email: 'stanT0@marvel.com' }
      const response = await request
        .put(`/v1/users/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.error).toBeFalsy()
      expect(body.data.id).toEqual(userId)
      expect(body.data.name).toEqual(updatedUser.name)
      expect(body.data.email).toEqual(updatedUser.email)
      done()
    })

    test('Should return a conflict error on invalid ID', async (done) => {
      const token = getToken({ userId })
      const invalidId = 99999999
      const response = await request
        .put(`/v1/users/${invalidId}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({})

      const { body, status } = response
      expect(status).toEqual(409)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a bad request on invalid schemas', async (done) => {
      const token = getToken({ userId })
      const invalidId = 'stringIsInvalid'
      const response = await request
        .put(`/v1/users/${invalidId}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({})

      const { body, status } = response
      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

  })

  describe('DELETE /users/:id', () => {

    test('Should return the conflict error on invalid ID', async (done) => {
      const token = getToken({ userId })
      const invalidId = 9999999
      const response = await request
        .delete(`/v1/users/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)

      const { body, status } = response
      expect(status).toEqual(409)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return the deleted user', async (done) => {
      const token = getToken({ userId })
      const response = await request
        .delete(`/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.data.id).toEqual(userId)
      done()
    })

  })

})
