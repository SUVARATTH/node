const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const secretKey = '123';
const db = require("../newweb/utills/utils");
const { json } = require('stream/consumers');
// Mock user authentication
function authenticateUser(pan) {
    if (pan === 'NGGPS5389B') {
        return true
    }
    return false
}
const auth = (req, res, next) => {
    const header = req.headers['authorization']
    const token = header
    jwt.verify(token, secretKey, function(err, ress) {
        if (err) throw err;
        if (!ress) {
            throw err
        }
        req.user = ress
        next()
    })
}

app.use("/", (req, res, next) => {
    if (req.url.includes("/login") || req.url.includes('/dashboard')) {
        next();
        return;
    }
    next();
    console.log(req.headers)
})
app.get('/', (req, res) => {
    res.render('login')
})


app.set('view engine', 'ejs')
app.set('views', __dirname)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.render('login')
})
app.post('/login', (req, res) => {
    const name = req.body.PAN;
    const user = authenticateUser(name);

    if (user) {
        // User authenticated, create JWT with redirect claim
        const payload = { sub: user.userId };
        let token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }

});
app.get('/dash', (req, res) => {
    res.send('hello')
})


app.post('/dashboard', auth, (req, res) => {
    // Your dashboard logic here
    res.send('hello')
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }

        req.user = decoded;
        next();
    });
}
app.post('/auth', auth, (req, res) => {
    res.render('xhr')
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
});