// const express = require('express')
// const sql = require('sqlite3').verbose();
// const db = new sql.Database('loan.db')
//     // user PAN Name Scores
//     // Scores Score Loan_amt  Interest
//     // (Loan_amt varchar(30),Date DATE)

// // db.run("drop table audit_1", (err, row) => {
// //         if (err) throw err;
// //     })

// // db.each('create table audit_1 (PAN varchar(30),date DATE,time TIME)', (err, row) => {
// //         if (err) throw err;
// //         console.log(row)
// //     })
// // db.each('create table audit_2 (PAN varchar(30),Loan_amt integer,date DATE,time TIME, lat varchar(30),long varchar(30))', (err, row) => {
// //         if (err) throw err;
// //         console.log(row)
// //     })
// db.each('SELECT * from audit_1', (err, row) => {
//     if (err) throw err;
//     console.log(row)
// })
const sqlite3 = require('sqlite3').verbose();
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Connect to SQLite database
const db = new sqlite3.Database('loan.db');

// Create a PDF document
const doc = new PDFDocument();
const output = fs.createWriteStream('output.pdf');

doc.pipe(output);

// Query data from SQLite and add to the PDF
db.all('SELECT * FROM audit_2', (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }

    rows.forEach((row) => {
        doc.text(`PAN: ${row.PAN}, Loan: ${row.Loan_amt}, Date: ${row.date},Time ${row.time},Latitude: ${row.lat},Longitude:${row.long}`);
        // Add more fields as needed
        doc.moveDown();
    });

    // Finalize the PDF
    doc.end();
    console.log('PDF generated successfully.');

    // Close the SQLite connection
    db.close();
});

output.on('finish', () => {
    console.log('PDF file written to disk.');
});