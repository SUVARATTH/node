const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.set('views', __dirname);
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(bodyParser.json({ limit: "50mb" }));

app.get('/', (req, res) => {
    res.render('dash')
})
app.use(express.json({ limit: '50mb' }));


// Your route handling
app.post('/back', (req, res) => {
    console.log(req, "req")
    const base64String = req.body.base64String;


    console.log('Received base64 string from front end:', base64String);

    res.json({ message: 'Base64 string received successfully!' });
});


app.listen(3000)