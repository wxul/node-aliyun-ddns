const net = require('./net');

net
    .update({
        RecordId: '3731875671593984',
        Value: '123.22.11.44'
    })
    .then(result => {
        console.log(JSON.stringify(result));
    })
    .catch(err => {
        console.log(err);
    });
