const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const secretKey = '123';

const auth = (req, res, next) => {
    const header = req.headers['authorization']
    const token = header

    if (req.url.includes("/login") || req.url.includes('/signup')) {
        next();
        return;
    } else {
        jwt.verify(token, secretKey, function(err, ress) {
            if (err) throw err;
            if (!ress) {
                throw err
            }
            req.user = ress
            next()
        })
    }
}

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
module.exports = { verifyToken, auth }