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
  const client = buildClient(req)
  // dev test from json db

  if (email === 'rai.pahak@gmail.com' && password === 'pahak123') {
    res.stausCode = 401
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
