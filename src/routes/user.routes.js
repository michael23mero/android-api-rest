const routerUser = require('express').Router()
const { controllers } = require('../controllers')

routerUser.post('/', controllers.ApiUserController.createUser)
routerUser.get('/', controllers.ApiUserController.readUser)
routerUser.put('/:id', controllers.ApiUserController.updateUser)
routerUser.delete('/:id', controllers.ApiUserController.deleteUser)
routerUser.get('/:id', controllers.ApiUserController.readOneUser)

routerUser.post('/auth', controllers.ApiUserController.authUser)

module.exports =  routerUser