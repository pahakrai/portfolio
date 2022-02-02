export function compose(...middlewares) {
  // Return getServerSideProps handler
  return async function composer(ctx) {
    let prevIndex = -1
    const pageProps = { props: {} }

    // Create middlewares runner
    const runner = async index => {
      // Check if `next` was called accidently muliple times
      if (index === prevIndex) {
        throw new Error('next() was called multiple times')
      }

      const middleware = middlewares[index]

      prevIndex = index

      if (typeof middleware === 'function') {
        // Run middlewares one by one
        await middleware(ctx, pageProps, () => {
          return runner(index + 1)
        })
      }
    }

    await runner(0)

    // Return results to next.js
    return pageProps
  }
}
