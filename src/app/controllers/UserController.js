const User = require('../models/User')

class UserController {
  /**
   * Função que cria um novo usuário
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exits' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }
}

module.exports = new UserController()
