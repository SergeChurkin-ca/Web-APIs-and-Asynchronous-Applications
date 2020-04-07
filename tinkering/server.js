const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('<h1>All set and running</h1>')
});
app.get('/hello', (req, res) => {
    res.send('<h1>Hello! </h1>')
});
app.listen(3000, () => {
    console.log('The application is running')
});

// ---------------------------------

app.post('/add', callBack);

function callBack(req, res) {
    res.send('POST receivd');
}

const data = [];

app.post('animal', addAnimal);

function addAnimal(req, res) {
    data.push(req.body);
}