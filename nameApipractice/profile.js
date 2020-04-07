// require https
const https = require('https');

const http = require('http');

// print error messages
function printError(err) {
    console.error(err.message)
}

function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

function get(username) {
    try {
        // connect to API url
        const req = https.get(`https://teamtreehouse.com/${username}.json`, res => {
            if (res.statusCode === 200) {
                // Read the data
                // Parse the data
                // Print out info from API

                let body = "";

                // read the data
                res.on('data', data => {
                    body += data.toString();
                });

                res.on('end', () => {
                    try {
                        // parse the data
                        const profile = JSON.parse(body);
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (err) {
                        printError(err);
                    }
                });
            } else {
                const message = `There was a error for getting the profile ${username} for (${http.STATUS_CODES[res.statusCode]})`;
                const statusCodeError = new Error(message)
                printError(statusCodeError);
            }
        });
        req.on('error', printError);
    } catch (err) {
        printError(err);
    }
}

module.exports.get = get;