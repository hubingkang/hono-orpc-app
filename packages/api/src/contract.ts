import { oc } from '@orpc/contract'

import todoContract from './modules/todo/todo.contract'

export const contracts = oc
  .errors({
    INTERNAL_SERVER_ERROR: {
      status: 422,
    },
    UNAUTHORIZED: {
      status: 401,
      message: 'Missing user session. Please log in!',
    },
    FORBIDDEN: {
      status: 403,
      message: 'You do not have enough permission to perform this action.',
    },
  })
  .router({
    todo: todoContract,
  })
