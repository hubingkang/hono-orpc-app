import * as z from 'zod'

export const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
})
