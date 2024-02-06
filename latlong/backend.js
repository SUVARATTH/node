const express = require('express')
const sql = require('sqlite3').verbose();
const db = new sql.Database('loan.db')
    // user PAN Name Scores
    // Scores Score Loan_amt  Interest
    // (Loan_amt varchar(30),Date DATE)

// db.run("drop table audit", (err, row) => {
//     if (err) throw err;

// })

db.each('create table audit_1 (PAN varchar(30),date DATE,time TIME, lat varchar(30),long varchar(30))', (err, row) => {
        if (err) throw err;
        console.log(row)
    })
    // db.each('SELECT * from user', (err, row) => {
    //     if (err) throw err;
    //     console.log(row)
    // })