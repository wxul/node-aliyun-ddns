const axios = require('axios');

console.log('begin poll');

setInterval(() => {
    axios.get('http://119.23.55.57:8098/ddns').then(response => {
        console.log(response.status);
    });
}, 1000 * 60 * 5);
