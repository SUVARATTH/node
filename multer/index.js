const express = require('express');
const multer = require('multer');
const app = express()
const bodyParser = require('body-parser')
const router = require('./routs/routs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000)