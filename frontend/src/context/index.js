/**
 * ***************************
 * @fileoverview Svelte stores
 * ***************************
 */

import { writable } from 'svelte/store'

export const user = writable({})

export const todos = writable([])
export const filterTodos = writable([])
