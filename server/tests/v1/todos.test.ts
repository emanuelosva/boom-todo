/**
 * *************************
 * @fileoverview Todos Tests
 * *************************
 */

import supertest from 'supertest'
import { app } from '../../src/app'
import { getToken } from '../../src/lib/auth/utils'
import { todoMock, existingUserMock } from './__mocks__'

describe('Todo ednpoints', () => {
  const request = supertest(app)

  let todoId: number
  const user = { ...existingUserMock }
  const newTodo = { ...todoMock }

  describe('POST /todos', () => {

    test('Should return the created todo', async (done) => {
      const token = getToken({ userId: user.id })
      const response = await request
        .post('/v1/todos')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(newTodo)

      const { body, status } = response
      expect(status).toEqual(201)
      expect(body.error).toBeFalsy()
      expect(typeof body.data.id).toBe('number')
      expect(body.data.title).toEqual(newTodo.title)
      expect(body.data.content).toEqual(newTodo.content)
      todoId = body.data.id
      done()
    })

    test('Should return a bad request on invalid schema', async (done) => {
      const token = getToken({ userId: user.id })
      const response = await request
        .post('/v1/todos')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 25, content: 'Invalid' })

      const { body, status } = response
      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a unauthorized error if no token', async (done) => {
      const response = await request
        .post('/v1/todos')
        .set('Accept', 'application/json')
        .send({ ...newTodo })

      const { body, status } = response
      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })

  })
})