// Importing dependencies
const express = require('express');  // Import Express.js for building the REST API
const logger = require('morgan');    // Import Morgan for logging HTTP requests
const errorhandler = require('errorhandler');  // Import Errorhandler for handling errors
const bodyParser = require('body-parser');    // Import Body Parser for parsing request bodies

// In-memory data store
let store = {};
store.accounts = [];

// Express app and middleware setup
let app = express();  // Initialize Express application
app.use(bodyParser.json());  // Use Body Parser middleware to parse JSON requests
app.use(logger('dev'));  // Use Morgan middleware for logging HTTP requests in development mode
app.use(errorhandler());  // Use Errorhandler middleware for handling errors

// Endpoint to get all accounts
app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts);  // Send the entire accounts array to the client
});

// Endpoint to create a new account
app.post('/accounts', (req, res) => {
    let newAccount = req.body;  // Extract the new account details from the request body
    let id = store.accounts.length;  // Generate an ID based on the current length of the accounts array
    store.accounts.push(newAccount);  // Add the new account to the in-memory store
    res.status(201).send({ id: id });  // Send a success response with the new account's ID
});

// Endpoint to update an existing account
app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body;  // Update the account at the specified ID with the new data
    res.status(200).send(store.accounts[req.params.id]);  // Send the updated account as a response
});

// Endpoint to delete an existing account
app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1);  // Remove the account at the specified ID from the array
    res.status(204).send("Account deleted successfully");  // Send a success response with no content
});

// Launch the server on port 3000
app.listen(3000);
console.log("Server is running on port 3000");
