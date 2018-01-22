const express = require('express');
const path = require('path');
const http = require('http');
const net = require('./net');

const app = express();

var DNS_ID = '3731875671593984';

app.get('/ddns', (req, res) => {
    var ip = req.connection.remoteAddress;
    console.log('ip: ', ip);
    if (ip.substr(0, 7) == '::ffff:') {
        ip = ip.substr(7);
    }
    console.log('ip: ', ip);
    net
        .update({
            RecordId: DNS_ID,
            Value: ip
        })
        .then(result => {
            console.log(JSON.stringify(result));
        })
        .catch(err => {
            console.log(err);
        });
    res.end('success!');
});

app.use(function(req, res, next) {
    console.log(req.url);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const PORT = 8098;
const server = http.createServer(app);
server.listen(PORT);
console.log('server is listening on port : ' + PORT);
server.on('error', err => {
    console.log(err);
    process.exit(1);
});
