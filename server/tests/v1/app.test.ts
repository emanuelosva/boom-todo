/**
 * *******************************
 * @fileoverview General app tests
 * *******************************
 */

import supertest from 'supertest'
import app from '../../src/app'


describe('General App Tests', () => {
  const request = supertest(app)

  test('Should return status 404 on invalid route', async () => {
    const response = await request.get('/invalidRoute')
    expect(response.status).toEqual(404)
  })

  test('Should return the defined response on error 404', async () => {
    const response = await request.get('/invalidRoute')

    const body = JSON.stringify(response.body)
    const expected = JSON.stringify({
      error: true,
      detail: 'Not found',
      data: {},
    })

    expect(body).toBe(expected)
  })
})
