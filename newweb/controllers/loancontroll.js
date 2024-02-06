const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const db = require('../utills/utils')
const checker = require('./verification')
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

// Format the time
const formattedTime = `${hours}:${minutes}:${seconds}`;
const loancheck = (req, res) => {
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
    res.send()


}
module.exports = { loancheck }