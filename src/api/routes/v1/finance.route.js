const express = require('express')
const controller = require('../../controllers/finance.controller')

const router = express.Router()

router.route('/positions').get(controller.getPositions)

router.route('/').get(controller.getFinance)

router.route('/rates').get(controller.getRates)

module.exports = router
