import axios from 'axios'
import jwt from 'jsonwebtoken'
import buildClient from '../../utils/build-client'

const KEY = 'r@nd0mS7rI9g'
export default async function (req, res) {
  if (!req.body) {
    res.statusCode = 404
    res.end('Error')
    return
  }

  const { email, password } = req.body

  // dev test from json db
  const users = await axios.get(`http://localhost:4000/users/`, {
    email,
    password
  })

  if (!users || users.length === 0) {
    res.statusCode = 401
    res.end('Error')
    return
  }

  res.json({
    token: jwt.sign(
      {
        email
      },
      KEY
    )
  })

  //   res.status(200).json({ name: 'John Doe' })
}
