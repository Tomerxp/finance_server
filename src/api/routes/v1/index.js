const express = require('express')
const financeRoutes = require('./finance.route')

const router = express.Router()

router.get('/status', (req, res) => res.send('OK'))

router.use('/finance', financeRoutes)

module.exports = router
