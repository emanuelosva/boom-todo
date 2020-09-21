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

  describe('GET /todos', () => {

    test('Should return a list with todos', async (done) => {
      const token = getToken({ userId: user.id })
      const response = await request
        .get('/v1/todos')
        .set('Authorization', `Bearer ${token}`)

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.error).toBeFalsy()
      expect(body.detail).toEqual('Todos retrieved')
      expect(typeof body.data).toBe('object')
      done()
    })

    test('Should return a unauthorized error if not token', async (done) => {
      const response = await request
        .get('/v1/todos')

      const { body, status } = response
      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })

  })

  describe('PUT /post/:id', () => {

    test('Should return the updated Todo', async (done) => {
      const newTitle = 'Updated title'
      const isUrgent = true
      const newtTotoDate = new Date('2025-12-18T10:30')
      const token = getToken({ userId: user.id })

      const response = await request
        .put(`/v1/todos/${todoId || 1}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: newTitle, isUrgent, dateTodo: newtTotoDate })

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.error).toBeFalsy()
      expect(body.detail).toEqual('Todo updated')
      expect(body.data.id).toEqual(todoId || 1)
      expect(body.data.title).toEqual(newTitle)
      expect(body.data.isUrgent).toBeTruthy()
      expect(new Date(body.data.dateTodo)).toEqual(newtTotoDate)
      done()
    })

    test('Should return a bad request on invalid payload', async (done) => {
      const token = getToken({ userId: user.id })

      const response = await request
        .put(`/v1/todos/${todoId || 1}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 25, dateTodo: 'This is Invalid' })

      const { body, status } = response
      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a unauthorized error if not token', async (done) => {
      const response = await request
        .put(`/v1/todos/${todoId || 1}`)

      const { body, status } = response
      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a conflict error on invalid ID', async (done) => {
      const token = getToken({ userId: user.id })
      const invalidId = 999999
      const response = await request
        .put(`/v1/todos/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({})

      const { body, status } = response
      expect(status).toEqual(409)
      expect(body.error).toBeTruthy()
      done()
    })

  })

  describe('DELETE /post/:id', () => {

    test('Should return a bad request on invalid id param', async (done) => {
      const token = getToken({ userId: user.id })
      const invalidId = 'thisIsInvalid'

      const response = await request
        .delete(`/v1/todos/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)

      const { body, status } = response
      expect(status).toEqual(400)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a unauthorized error if not token', async (done) => {
      const response = await request
        .delete(`/v1/todos/${1}`)

      const { body, status } = response
      expect(status).toEqual(401)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return a conflict error on invalid ID', async (done) => {
      const token = getToken({ userId: user.id })
      const invalidId = 99999
      const response = await request
        .delete(`/v1/todos/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)

      const { body, status } = response
      expect(status).toEqual(409)
      expect(body.error).toBeTruthy()
      done()
    })

    test('Should return the deleted Todo', async (done) => {
      const token = getToken({ userId: user.id })

      const response = await request
        .delete(`/v1/todos/${todoId || 1}`)
        .set('Authorization', `Bearer ${token}`)

      const { body, status } = response
      expect(status).toEqual(200)
      expect(body.error).toBeFalsy()
      expect(body.detail).toEqual('Todo deleted')
      expect(body.data.id).toEqual(todoId || 1)
      done()
    })

  })

})