/**
 * ***************************
 * @fileoverview Svelte stores
 * ***************************
 */

import { writable } from 'svelte/store';

export const user = writable({});

export const todos = writable([]);

export const updateTodo = (id, data) => {
  todos.update(current => {
    const [todo] = current.filter((t) => t.id === id)
    console.log(todo)
    if (!todo) return current
    const index = current.indexOf(todo)
    current[index] = data
    return current
  });
}

export const filterTodos = writable([]);
