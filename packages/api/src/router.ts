import type { RouterClient } from '@orpc/server'
import todoRouter from './modules/todo/todo.router'

export const appRouter = {
  todo: todoRouter,
}

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
