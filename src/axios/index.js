const axios = require('axios');
const { prefix } = require('../../config');
const sign = require('./sign');

var instance = axios.create({
    baseURL: prefix,
    timeout: 8000
});

// Add a request interceptor
instance.interceptors.request.use(
    function(config) {
        config.params = sign.parseParams(config.params, config.method);
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function(response) {
        // Do something with response data
        console.log(response.status);
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    },
    function(error) {
        console.log(error.response.data);
        // Do something with response error
        return Promise.resolve(false);
    }
);

module.exports = instance;
