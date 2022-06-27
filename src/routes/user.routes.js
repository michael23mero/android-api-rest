const routerUser = require('express').Router()
const { controllers } = require('../controllers')

routerUser.post('/register', controllers.ApiUserController.register)
routerUser.post('/login', controllers.ApiUserController.login, controllers.ApiUserController.isAuthenticated)


routerUser.get('/', controllers.ApiUserController.readUser)
routerUser.put('/:id', controllers.ApiUserController.updateUser)
routerUser.delete('/:id', controllers.ApiUserController.deleteUser)
routerUser.get('/:id', controllers.ApiUserController.readOneUser)

module.exports =  routerUser