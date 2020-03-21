//Express to run server and routes
const express = require('express');

// Startup an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
// Middleware
// Configure express to use body parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin alowance
const cors = require('cors');
app.use(cors());

// Initialize main project folder
app.use(express.static('demo'));

const port = 8080;

const server = app.listen(port, listening);

function listening() {
    console.log('Server is running');
    console.log(`running on localhost ${port}`);
}