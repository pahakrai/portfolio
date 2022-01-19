import { authGuard } from './auth-guard'

export { apiAuthHandler }

// NOTE ONLY FOR NEXTJS API
function apiAuthHandler(handler) {
  return async (req, res) => {
    // TODO: check handler supports provided HTTP method
    // authGuard middleware
    await authGuard(req, res)

    // route handler
    await handler(req, res)

    // handle error elsewhere
  }
}
