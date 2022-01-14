import axios from 'axios'

// NOTE: MOSLTY USED FOR getInitialProps
// IN CASE OF REQUIREMENT OF SERVER RENDERING / CLIENT RENDERING
// BUT MOSTLY FOR SERVER AS OTHER PAGE PROPS ARE MOSTLY SERVER RENDERED
const axiosClient = (req = {}) => {
  let client
  if (typeof window === 'undefined') {
    // TODO: from env config
    const BASE_URL_SERVER = 'http://localhost:4000/'
    // we are on the server
    client = axios.create({
      baseURL:
        // replace from env config
        BASE_URL_SERVER,
      headers: req.headers
    })
  } else {
    // we must be on the browser
    client = axios.create({
      baseUrl: '/'
    })
  }
  return client
}

export default axiosClient

// NOTE: interceptor samples
// If you need to remove an interceptor later you can.

// const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);
// You can add interceptors to a custom instance of axios.

// const instance = axios.create();
// instance.interceptors.request.use(function () {/*...*/});

// axios.interceptors.request.use(request => {
//   // add auth header with jwt if account is logged in and request is to the api url
//   const account = accountService.accountValue
//   const isLoggedIn = account?.token
//   const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL)

//   if (isLoggedIn && isApiUrl) {
//     request.headers.common.Authorization = `Bearer ${account.token}`
//   }

//   return request
// })
