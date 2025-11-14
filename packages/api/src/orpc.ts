import type { Context as HonoContext } from 'hono'
import { auth } from '@hono-orpc-app/auth'
import { implement } from '@orpc/server'
import { contracts } from './contract'

export type CreateContextOptions = {
  context: HonoContext
}

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  })
  return {
    session,
  }
}

// export const orpc = implement(contracts)
export const publicProcedure =
  implement(contracts).$context<Awaited<ReturnType<typeof createContext>>>()
