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