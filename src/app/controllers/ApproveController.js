const Purchase = require('../models/Purchase')

class AproveController {
  /**
   * Atualiza um anúncio já comprado
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  async update (req, res) {
    const { id } = req.params

    const { ad } = await Purchase.findById(id).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: "You're not author" })
    }

    if (ad.purchasedBy) {
      return res
        .status(400)
        .json({ error: 'This ad has already been purchased' })
    }

    ad.purchasedBy = id

    await ad.save()

    return res.json(ad)
  }
}

module.exports = new AproveController()
