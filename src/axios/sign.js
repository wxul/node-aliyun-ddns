const { AccessKeyID, AccessKeySecret } = require('../../app_config.js');
const crypto = require('crypto');

module.exports = {
    // 添加一些公共参数
    addParams(params) {
        return Object.assign({}, params, {
            Format: 'JSON',
            Version: '2015-01-09',
            AccessKeyId: AccessKeyID,
            SignatureMethod: 'HMAC-SHA1',
            Timestamp: new Date().toISOString(),
            SignatureVersion: '1.0',
            SignatureNonce: this.random()
        });
    },
    sign(params, method) {
        var arr = [];
        for (var k in params) {
            arr.push({
                key: k,
                value: params[k]
            });
        }
        arr.sort((a, b) => {
            return a.key > b.key ? 1 : a.key < b.key ? -1 : 0;
        });

        var arrstr = '';
        arr.forEach(a => {
            arrstr += `&${a.key}=${a.value}`;
        });
        arrstr = arrstr.slice(1);
        arrstr =
            `${method.toUpperCase()}&${this.encode('/')}&` +
            this.encode(arrstr);
        // 时间需要多转一次？
        arrstr = arrstr.replace(/\%3A/g, '%253A');
        // console.log(arrstr);
        var hmac = this.sha1(arrstr);
        // console.log(hmac);
        return hmac;
    },
    parseParams(params, method) {
        params = this.addParams(params);
        params.Signature = this.sign(params, method);
        return params;
    },
    random() {
        return Math.random()
            .toString(36)
            .substr(2);
    },
    encode(s) {
        return encodeURIComponent(s).replace(/\*/g, '%2A');
    },
    sha1(s) {
        var hmac = crypto.createHmac('sha1', AccessKeySecret + '&');
        hmac.update(s);
        return hmac.digest('base64');
    }
};

//GET&%2F&AccessKeyId%3DLTAIjpQ0phKF2wAq%26Action%3DDescribeDomainRecords%26DomainName%3Damayading.com%26Format%3DJSON%26SignatureMethod%3DHMAC-SHA1%26SignatureNonce%3Dp4y6ugy8se%26SignatureVersion%3D1.0%26Timestamp%3D2018-01-22T08%3A10%3A27.428Z%26Version%3D2015-01-09
//GET&%2F&AccessKeyId%3DLTAIjpQ0phKF2wAq%26Action%3DDescribeDomainRecords%26DomainName%3Damayading.com%26Format%3DJSON%26SignatureMethod%3DHMAC-SHA1%26SignatureNonce%3Dp4y6ugy8se%26SignatureVersion%3D1.0%26Timestamp%3D2018-01-22T08%253A10%253A27.428Z%26Version%3D2015-01-09
