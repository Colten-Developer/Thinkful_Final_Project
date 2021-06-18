/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require('../errors/methodNotAllowed')

router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

router
    .route('/reservations/new')
    .post(controller.create)
    .get(controller.list)
    .all(methodNotAllowed)

router 
    .route('/dashboard')

router
    .route('/reservations')

module.exports = router;
