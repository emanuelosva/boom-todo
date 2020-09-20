/**
 * *******************************
 * @fileoverview Users Tests
 * *******************************
 */

import supertest from 'supertest'
import { app } from '../../src/app'

describe('Users Endpoints', () => {
  const request = supertest(app)

  let userId
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
  })
})
