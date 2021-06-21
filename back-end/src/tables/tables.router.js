const router = require('express').Router()
const controller = require('./tables.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')


//get tables/:tableId
//post tables
//get tables
//get reservations/:reservationId
//put /tables/:tableId/seat


router
    .route('/')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

router
    .route('/:tableId')
    .read(controller.read)
    .put(controller.update)
    .all(methodNotAllowed)

module.exports = router