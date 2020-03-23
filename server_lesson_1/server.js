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

app.get('/', function(req, res) {
    res.send('All set and running')
})

// ROUTES nad POST requests
const data = []

app.post('/addMovie', addMovie)

function addMovie(req, res) {
    console.log(req.body)
    data.push(req.body)
}
// ------------------------------------------------------------
/* 1) In the file, server.js, create a POST route that uses the url
 add and sends the response POST received when used to make a request.
 */

app.post('/add', callBack);

function callBack(req, res) {
    res.send('POST received');
}

/* 2) Add a POST route for adding a favorite animal via the path ’/animal’ 
to an array named data. You will need to create the array as well.
 */

const data = [];

app.post('/animal', addAnimal)

function addAnimal(req, res) {
    data.push(req.body)
}