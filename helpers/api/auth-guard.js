// NOTE: NOW THE MIDDLEWARE CAN BE IMPLEMENTED DIRECTLY INTO PAGES
// NOTE: currently using json-db for users data
import axios from 'axios'
import jwt from 'jsonwebtoken'

export { authGuard }

async function authGuard(req, res) {
  // check for basic auth header
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf('Bearer ') === -1
  ) {
    return res.status(401).json({
      status: 'error',
      error: 'req auth header be empty'
    })
  }

  // verify auth credentials
  const token = req.headers.authorization.split(' ')[1]
  const tokenData = jwt.decode(token)

  if (!tokenData) {
    return res.status(401).json({
      status: 'error',
      error: 'req auth header be empty'
    })
  }

  const users = await axios.get(`http://localhost:4000/users/`, {
    email: tokenData.email
  }) // fetches the users with email

  if (!users || !users?.data?.length) {
    return res.status(401).json({
      status: 'error',
      error: 'req auth header be empty'
    })
  }

  // attach user to request object
  req.currentUser = users?.data?.[0]
}
