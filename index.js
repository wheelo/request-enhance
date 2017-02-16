// or WHATWG's fetch
let fetch = require('./lib/fetch');


module.exports = function(reqParam) {
    let {method, url, params, timeout, successCallback, errorCallback, completeCallback, logError} = reqParam;

    let currentSeq;

    window.seq = currentSeq = generateSeq();

    (function(curSeq) {
        if(timeout) {
            var curTimeout = setTimeout(function() {
                window.seq = generateSeq();
                logError('408', '请求超时');
            }, timeout);
        }

        fetch({
            url,
            method,
            data: params,
            success(data) {
                if(timeout) {
                    if(window.seq === curSeq) {
                        successCallback && successCallback(data);
                    }
                } else {
                    successCallback && successCallback(data);
                }
            },

            error(data) {
                if(timeout) {
                    if (window.seq === curSeq) {
                        errorCallback && errorCallback(data);
                    }
                } else {
                    errorCallback && errorCallback(data);
                }
            },

            complete(data) {
                if(timeout) {
                    clearTimeout(curTimeout);
                    if(window.seq === curSeq) {
                        completeCallback && completeCallback(data);
                    }
                } else {
                    completeCallback && completeCallback(data);
                }

            }

        });

    })(currentSeq)

}


function randomGenerator(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);
}


function generateSeq() {
    // timestamp + random num
    return +new Date() + randomGenerator(5);
}