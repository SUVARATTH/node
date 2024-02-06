const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const jwt = require('jsonwebtoken')
const db = require('../utills/utils')

function isValidPanNumber(panNumber) {
    // Regular expression for PAN number format validation
    const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]$/;

    // Test the provided PAN number against the regex
    return panRegex.test(panNumber);
}
const secretKey = '12345'

const verification = (req, res) => {
    const pan = req.body.PAN
    if (isValidPanNumber(pan)) {
        const payload = { sub: pan.pan };
        let token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
        // console.log(token)

        db.get('SELECT * FROM user WHERE  PAN= ?', [pan], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }
            if (row) {
                // db.run('insert into audit_1 values(?,?,?)', [number, formattedDate, formattedTime], (err) => {
                //     if (err) throw err
                // })
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
        })
    } else {
        res.send('ENTER A VALID PAN')
    }
}
module.exports = { verification }