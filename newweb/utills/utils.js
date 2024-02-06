// const bodyParser = require('body-parser')
// const express = require('express')
// const app = express()
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());
const sql = require('sqlite3').verbose();
const db = new sql.Database('loan.db')
module.exports = db