// Import the connectAndInsert function from server.js
const connectAndInsert = require('./server');

// Data to be inserted
const documentsToInsert = [
    { name: 'JoDoe', age: 30, city: 'New York' },
    { name: 'Jane Smith', age: 25, city: 'San Francisco' },
    { name: 'Bob Johnson', age: 35, city: 'Los Angeles' },
];

// Call the connectAndInsert function with the data
connectAndInsert(documentsToInsert);