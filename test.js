var reqParams = {
    method: 'post',
    url,
    params: passParams,
    //timeout: 20000,
    // 参数传输可能有问题
    successCallback: successCallback.bind(self, passParamsJson),
    errorCallback: errorCallback.bind(self),
    completeCallback: function() {},
    logError: logError.bind(self)
};

ajaxEnhanced(reqParams);