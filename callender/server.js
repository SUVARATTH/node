const express = require('express')
const app = express()
const port = 300

const readline = require('readline')
const google = require('googleapis')
const credentials = require('./credentials.json')
const { client_id, client_secret, redirect_uris } = credentials.web


app.get('/', (req, res) => {})

app.listen(port, () => {
    console.log('Port 300')
})