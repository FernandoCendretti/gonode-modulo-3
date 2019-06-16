const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailConfig)

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')
/**
 * Midlleware que configura o jeito que o nodemailer vai entender os templates
 * de email
 */
transport.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, 'partials'),
      defaultLayout: null
    }),
    viewPath,
    extName: '.hbs'
  })
)

module.exports = transport
