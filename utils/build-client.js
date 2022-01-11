import axios from 'axios'

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // TODO: from env config
    const BASE_URL_SERVER = 'http://localhost:4000/'
    // we are ont the server
    return axios.create({
      baseURL:
        // replace from env config
        BASE_URL_SERVER,
      headers: req.headers
    })
  } else {
    // we must be on the browser
    return axios.create({
      baseUrl: '/'
    })
  }
}
