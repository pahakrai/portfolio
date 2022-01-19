import { apiAuthHandler } from '../../helpers/api'

export default apiAuthHandler(function (req, res) {
  res.json({ user: req.currentUser })
})
