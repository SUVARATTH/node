const express = require('express');
const router = express.Router()
const multer = require('multer');
const bodyParser = require('body-parser')
const { stringify } = require('querystring');
const controller = require('../controllers/controllers')
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get('/', controller.index)
router.post('/upload', upload.single('image'), controller.insert)
router.get('/admin', controller.admin)
module.exports = router