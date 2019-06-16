const Mail = require('../services/Mail')

class PurchaseMail {
  /**
   * Chave para o disparo de emails
   */
  get key () {
    return 'PurchaseMail'
  }

  /**
   * Função que dispara um email da fila
   * @param  job
   * @param  done
   */
  async handle (job, done) {
    const { ad, user, content } = job.data

    await Mail.sendMail({
      from: '"Fernando Cendretti" <luiz.cendretti@gmail.com>',
      to: ad.author.email,
      subject: `Solicitação de compra:${ad.title}`,
      template: 'purchase',
      context: { user, content, ad: ad }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
