const express = require("express")
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname);
const port = 5000

app.get('/', (req, res) => {

    res.send('Hello world')
})

app.listen(port, () => {
    console.log(port)
})