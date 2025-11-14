import { oc } from '@orpc/contract'
import * as z from 'zod'

import { TodoSchema } from './todo.schema'

export const getAllTodos = oc
  .route({
    method: 'GET',
    path: '/todos',
    summary: 'Get all todos',
    tags: ['Todos'],
  })
  .output(z.array(TodoSchema))

export const createTodo = oc
  .route({
    method: 'POST',
    path: '/todos',
    summary: 'Create a todo',
    tags: ['Todos'],
  })
  .input(z.object({ text: z.string() }))
  .output(TodoSchema)

export const toggleTodo = oc
  .route({
    method: 'PUT',
    path: '/todos/:id/toggle',
    summary: 'Toggle a todo',
    tags: ['Todos'],
  })
  .input(z.object({ id: z.number(), completed: z.boolean() }))

export const deleteTodo = oc
  .route({
    method: 'DELETE',
    path: '/todos/:id',
    summary: 'Delete a todo',
    tags: ['Todos'],
  })
  .input(z.object({ id: z.number() }))

export default {
  getAll: getAllTodos,
  create: createTodo,
  toggle: toggleTodo,
  delete: deleteTodo,
}
