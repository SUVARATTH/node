const express = require('express')
const route = express.Router()
const controller = require('../controllers/controller')
const verifier = require('../controllers/verification')
const loancheck = require('../controllers/loancontroll')
const { verify, auth } = require('../controllers/jwt')
const subroute = require("./subroutes");
const app = express()
app.use('/', auth)

route.get('/', controller.index)
route.get('/login', controller.login)
route.get('/signup', controller.signup)
    // route.use('/PAN', subroute)
route.post('/PAN', verifier.verification)
route.get('/accept', controller.imintrested)
route.post('/next', loancheck.loancheck)
route.get('/final', controller.lastpage)
module.exports = route