/**
 * *****************************************
 * @fileoverview Mocks for testing endpoints
 * *****************************************
 */

export const userMock = {
  name: 'Stan',
  email: 'stan@marvel.com',
  password: 'user123',
}

export const existingUserMock = {
  name: 'Emanuel',
  email: 'emanuel@gmail.com',
  password: 'user123',
  id: 1,
}

export const todoMock = {
  title: 'Create the Ui of BoomTodo',
  content: 'Planning, desing and implement the Svelte Ui for Boom Todo',
  tag: 'work',
  dateTodo: '2020-12-18T10:30'
}
