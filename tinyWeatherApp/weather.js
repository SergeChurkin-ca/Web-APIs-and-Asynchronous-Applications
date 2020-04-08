const https = require('https');
const apr = require('./api.json');

function get(query) {
    const request = (`https://api.weatherbit.io/v2.0/current?city=${query}=${api.key}`,
        response => {

            let body = "";
            //read the data
            response.on('data', data => {
                body += chunk;
            });
            response.on('end', () => {
                console.log(body);
            })
        });
}

module.exports.get = get;