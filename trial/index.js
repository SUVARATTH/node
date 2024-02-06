const express = require('express');
const app = express();
const port = 3000;
const bod = require('body-parser')
    // var jsonParser = bod.json()

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bod.urlencoded({ extended: false })
app.use(bod.urlencoded({ extended: true }))

// app.use(bod.json())
app.use(bod.json())



app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', __dirname); // Optional: serve static files from a 'public' folder

app.get('/', (req, res) => {
    res.render('index'); // Assuming you have an 'index.ejs' file in the 'views' folder
});
app.post('/abc', (req, res) => {
    const { lat, long } = req.body
    console.log(lat, long)
    res.send(lat)

})
app.get('/hello', (req, res) => {
    res.render('hello');
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});