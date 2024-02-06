const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    applicantName: String,
    loanAmount: Number,

});

const img = mongoose.model('img', loanSchema);
const mongoDBUrl = 'mongodb://127.0.0.1:27017/image';

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;


db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', async() => {
    try {
        const newLoan = new Loan({
            applicantName: 'suv',
            loanAmount: 50000,

        });
        await newLoan.save();

        console.log('Data inserted successfully:', newLoan);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await mongoose.connection.close();
    }
});