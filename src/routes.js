const express = require('express')
const validate = require('express-validation')

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
  controllers.UserController.store
)

// --- Login do usuário
routes.post(
  '/sessions',
  validate(validators.Session),
  controllers.SessionController.store
)

// --- Middleware de autenticação
routes.use(authMiddlewares)

/**
 * Ads
 */

// -- Lista todos os Ads
routes.get('/ads', controllers.AdController.index)
// -- Lista um único Ad
routes.get('/ads/:id', controllers.AdController.show)
// -- Cria um novo Ad
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
// -- Atualiza um Ad
routes.put('/ads/:id', validate(validators.Ad), controllers.AdController.update)
// -- Deleta um Ad
routes.delete('/ads/:id', controllers.AdController.destroy)

/**
 * Purchase
 */

// -- Solicitação de compras
routes.post(
  '/purchases',
  validate(validators.Purchase),
  controllers.PurchaseController.store
)

module.exports = routes
