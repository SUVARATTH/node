const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');
router.get('/', controller.home)
router.post('/home', controller.base)
module.exports = router