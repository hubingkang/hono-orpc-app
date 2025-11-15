import type { Context as HonoContext } from 'hono'
import { auth } from '@hono-orpc-app/auth'
import { implement } from '@orpc/server'
import { ORPCError } from '@orpc/contract'
import { contracts } from './contract'

export type CreateContextOptions = {
  context: HonoContext
}

export async function createORPCContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  })
  return {
    session,
  }
}

export const publicProcedure =
  implement(contracts).$context<Awaited<ReturnType<typeof createORPCContext>>>()

export const protectedProcedure = implement(contracts)
  .$context<Awaited<ReturnType<typeof createORPCContext>>>()
  .use(async ({ context, next }) => {
    if (!context.session?.user) {
      throw new ORPCError('UNAUTHORIZED')
    }
    return await next({
      context: {
        ...context,
        user: context.session.user,
      },
    })
  })
