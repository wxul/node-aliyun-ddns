const net = require('../net');

var DNS_ID;

module.exports.get = function() {
    return new Promise((resolve, reject) => {
        if (DNS_ID) resolve(DNS_ID);
        else {
            net.getList('ddns').then(result => {
                if (
                    result &&
                    result.DomainRecords &&
                    result.DomainRecords.Record &&
                    result.DomainRecords.Record.length
                ) {
                    DNS_ID = result.DomainRecords.Record[0].RecordId;
                    resolve(DNS_ID);
                } else {
                    reject(false);
                }
            });
        }
    });
};
