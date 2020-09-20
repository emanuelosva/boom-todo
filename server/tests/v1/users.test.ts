/**
 * *******************************
 * @fileoverview Users Tests
 * *******************************
 */

import supertest from 'supertest'
import app from '../../src/app'

describe('Users Endpoints', () => {
  const request = supertest(app)

  describe('POST /users/signup', () => {
    test('Should return the user and token with status 201', async () => {
      const response = await request.post('/v1/users/signup')
      expect(response.status).toEqual(201)

      const { body } = response
      expect(body.error).toBeFalsy()
      expect(body.detail).toEqual('User created & logged')
      expect(body.data.token).toBe(String)
      expect(body.data.user.id).toBe(Number)
    })
  })
})
