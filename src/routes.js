const express = require('express')
const routes = express.Router()

const authMiddlewares = require('./app/middlewares/auth')
const controllers = require('./app/controllers')

/**
 * Users
 */

// --- Cadastra um novo usuário
routes.post('/users', controllers.UserController.store)

// --- Login do usuário
routes.post('/sessions', controllers.SessionController.store)

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
routes.post('/ads', controllers.AdController.store)
// -- Atualiza um Ad
routes.put('/ads/:id', controllers.AdController.update)
// -- Deleta um Ad
routes.delete('/ads/:id', controllers.AdController.destroy)

/**
 * Purchase
 */

// -- Solicitação de compras
routes.post('/purchases', controllers.PurchaseController.store)

module.exports = routes
