const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const uroute = require('./routes')
const app = express();
const sql = require('sqlite3').verbose();
const db = new sql.Database('loan.db')
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.set('views', __dirname);
app.use(bodyParser.urlencoded({ extended: false }));
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

// Format the time
const formattedTime = `${hours}:${minutes}:${seconds}`;
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('dashbord');
});
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/new', (req, res) => {

    const Name = req.body.NAME
    const PAN = req.body.PAN
    db.each("select PAN from  user", (err, r) => {
        if (err) throw err;
        const arr = []
        arr.push(r.PAN)
        if (arr.includes(PAN)) {
            res.send("USER EXISTS")
        } else {
            db.run("INSERT INTO user values(?,?,?)", [PAN, Name, 0], (err) => {
                if (err) throw err;
                res.send("SUCCESS")
            })
        }
    })

})
app.use(bodyParser.json());



app.use(express.static('public')); // Serve the HTML file
app.post('/PAN', (req, res) => {
    const number = req.body.PAN;

    db.get('SELECT * FROM user WHERE  PAN= ?', [number], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (row) {
            db.run('insert into audit_1 values(?,?,?)', [number, formattedDate, formattedTime], (err) => {
                if (err) throw err
            })
            var actual_cibil = row.Scores;
            var cibil = Math.floor(actual_cibil / 100) * 100;

            db.get('SELECT * FROM cibil WHERE Score = ?', [cibil], (err, cibilRow) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Internal Server Error');
                }


                if (cibilRow) {


                    amt = cibilRow.Loan_amt
                    let data = {
                        'Your Score': actual_cibil,
                        'you are eligible for loan amt': amt,
                        'At interest of': cibilRow.Interest
                    };

                    res.render('display', { data })
                } else {
                    res.status(404).send('Cibil data not found');
                }

            });
        } else {
            res.status(404).send('User not found');
        }
    });
});

app.get('/accept', (req, res) => {
    res.render('acceptance')
})
app.post('/location', (req, res) => {
    const { lat, long, PAN, loan } = req.body
    console.log(lat, long, PAN, loan)
    db.get('select * from audit_1 where PAN=?', [PAN], (err, row) => {
        if (err) throw err;
        let arr = []
        if (row) {

            db.get('select * from user  where PAN=?', [PAN], (err, rowuser) => {
                if (err) throw err
                if (rowuser) {

                    var actual_cibil = rowuser.Scores;
                    var cibil = Math.floor(actual_cibil / 100) * 100;

                    db.get('select * from cibil where Score=?', [cibil], (err, rowcibil) => {
                        if (err) throw err;
                        if (loan <= rowcibil.Loan_amt) {
                            db.run('insert into audit_2 values(?,?,?,?,?,?)', [PAN, loan, formattedDate, formattedTime, lat, long], (err) => {
                                if (err) throw err
                            })
                        }

                    })


                }
            })
        }
    })

})



// app.get('/gov', (req, res) => {
//     res.send('hello')
// })
// return redirect('hello_world', filename = uploaded_file.name)
app.get('/next', (req, res) => {
    res.send('done')
})

// Close the database connection after the server is closed
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});