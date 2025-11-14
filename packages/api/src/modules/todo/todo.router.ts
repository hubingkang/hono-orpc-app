import { eq } from 'drizzle-orm'
import { db } from '@hono-orpc-app/db'
import { todo } from '@hono-orpc-app/db/schema/todo'
import { publicProcedure } from '../../orpc'

export const getAllTodos = publicProcedure.todo.getAll.handler(async () => {
  return await db.select().from(todo)
})

export const createTodo = publicProcedure.todo.create.handler(
  async ({ input, errors }) => {
    const [result] = await db
      .insert(todo)
      .values({
        text: input.text,
      })
      .returning()

    if (!result) {
      throw errors.INTERNAL_SERVER_ERROR({
        message: 'Failed to create todo',
      })
    }

    return result
  }
)

export const toggleTodo = publicProcedure.todo.toggle.handler(
  async ({ input }) => {
    return await db
      .update(todo)
      .set({ completed: input.completed })
      .where(eq(todo.id, input.id))
  }
)

export const deleteTodo = publicProcedure.todo.delete.handler(
  async ({ input }) => {
    return await db.delete(todo).where(eq(todo.id, input.id))
  }
)

export default {
  getAll: getAllTodos,
  create: createTodo,
  toggle: toggleTodo,
  delete: deleteTodo,
}
