import { errorHandler } from './index'

export { apiHandler }

// NOTE ONLY FOR NEXTJS API
function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase()

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`)

    try {
      // global middleware
      // await basicAuthMiddleware(req, res)

      // route handler
      await handler[method](req, res)
    } catch (err) {
      // global error handler
      errorHandler(err, res)
    }
  }
}
