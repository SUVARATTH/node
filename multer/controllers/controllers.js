const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const { stringify } = require('querystring');
const data_base = require('../services/services')
const index = (req, res) => {
    res.render('index')
}
const insert = async(req, res) => {
    console.log(req.body)
    if (!req.file) {
        res.status(400).send('No file uploaded');
        return;
    }

    const buffer = req.file.buffer;
    const base64Image = buffer.toString('base64');
    const PAN = req.body.PAN;
    const data = [
        { PAN: PAN, img: base64Image, lat: req.body.lat, long: req.body.long }
    ]
    data_base.data_base(data)
    res.send('DONE')
}
const admin = async(req, res) => {
    try {
        const data = await data_base.getdata();
        // console.log({ data })
        res.render('alldata', { data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = { index, insert, admin }