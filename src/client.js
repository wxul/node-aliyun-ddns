const axios = require('axios');

console.log('begin poll');

setInterval(() => {
    axios.get('http://www.baidu.com').then(response => {
        console.log(response.status);
    });
}, 1000 * 60 * 5);
