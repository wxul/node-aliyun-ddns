const axios = require('../axios');
const { domain, dnsRR } = require('../../config');

module.exports = {
    // 获取解析记录列表
    // DomainName, PageNumber, PageSize, RRKeyWord, TypeKeyWord, ValueKeyWord
    getList(params) {
        params = Object.assign({}, params, {
            Action: 'DescribeDomainRecords',
            DomainName: domain,
            RRKeyWord: dnsRR
        });
        return axios.get(`/`, { params });
    },
    update(params) {
        params = Object.assign({}, params, {
            Action: 'UpdateDomainRecord',
            RR: dnsRR,
            Type:'A'
        });
        return axios.get(`/`, { params });
    },
    add(params) {
        params = Object.assign({}, params, {
            Action: 'AddDomainRecord',
            DomainName: domain,
            RR: dnsRR,
            Type: 'A',
            Value: '183.15.178.25'
        });
        return axios.get(`/`, { params });
    }
};
