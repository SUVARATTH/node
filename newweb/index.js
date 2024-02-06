const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const route = require('./routes/routes')
const app = express();
const auth = require('./controllers/jwt')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use("/", (req, res, next) => {
    if (req.url.includes("/login") || req.url.includes('/dashboard')) {
        next();
        return;
    }
    next();
    console.log(req.headers)
})
app.use('/', route)
    // app.use('/', auth.auth)
app.listen(3000, () => {})