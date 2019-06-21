const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const routes = express.Router()
const authMiddlewares = require('./app/middlewares/auth')
const controllers = require('./app/controllers')
const validators = require('./app/validators')

/**
 * Users
 */

// --- Cadastra um novo usuário
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)

// --- Login do usuário
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

// --- Middleware de autenticação
routes.use(authMiddlewares)

/**
 * Ads
 */

// -- Lista todos os Ads
routes.get('/ads', handle(controllers.AdController.index))
// -- Lista um único Ad
routes.get('/ads/:id', handle(controllers.AdController.show))
// -- Cria um novo Ad
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
// -- Atualiza um Ad
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
// -- Deleta um Ad
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchase
 */

// -- Solicitação de compras
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

module.exports = routes
