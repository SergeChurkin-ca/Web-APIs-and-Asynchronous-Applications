const Twilio = require("twilio");
const client = new Twilio("AC2aefcc19bf8c590f4fefb3366817bc1d", "f810c86b1cb3dab3b15819b1b727f9b8");

client.messages
    .create({
        body: 'Kiss kiss',
        media: "/2010-04-01/Accounts/AC2aefcc19bf8c590f4fefb3366817bc1d/Messages/MMf946940bf5ee46ad9c74c6b125dca73f/Media.json",
        from: '+13345648191',
        to: '+12895017013'
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));

console.log('Gatherting your message log');