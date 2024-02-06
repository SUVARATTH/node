// const bodyParser = require('body-parser')
// const express = require('express')
// const app = express()
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());
// const sql = require('sqlite3').verbose();
// const db = new sql.Database('loan.db')
const index = (req, res) => {
    res.render('dashbord')
}
const login = (req, res) => {
    res.render('login')
}
const signup = (req, res) => {
    res.render('signup')
}
const verification = (req, res) => {
    const PAN = req.body.PAN

}
const imintrested = (req, res) => {
    res.render('acceptance')
}
const lastpage = (req, res) => {
    res.send('DONE')
}

module.exports = { index, login, signup, verification, imintrested, lastpage }