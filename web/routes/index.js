const express = require('express')
const route = express.Router()

route.get('/', (res, req) => {
    res.send('dashboard')
})
route.get('/login', (res, req) => {
    res.send('lohin page')
})
route.get('/signup', (res, req) => {
    res.send('Signup')
})

module.exports = { route }