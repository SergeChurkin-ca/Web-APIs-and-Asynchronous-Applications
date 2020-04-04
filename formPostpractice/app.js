const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
    // res.send('connection set up and running on port 3001')
})

app.listen(3002, () => {
    console.log('setup and running on local host:3001')
})