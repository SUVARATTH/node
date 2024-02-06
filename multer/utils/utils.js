const mongoose = require('mongoose');
const { stringify } = require('querystring');


const imageSchema = new mongoose.Schema({
    PAN: String,
    img: String,
    lat: String,
    long: String
});

const Image = mongoose.model('Image', imageSchema);


const mongoDBUrl = 'mongodb://127.0.0.1:27017/image';

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
module.exports = db