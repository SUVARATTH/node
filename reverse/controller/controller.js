const home = (req, res) => {
    res.render('home')
}
const base = (req, res) => {
    res.send('hiii')
}
module.exports = { home, base }