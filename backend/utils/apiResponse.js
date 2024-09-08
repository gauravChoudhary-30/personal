exports.apiResponse = function ( res, message, data, statuscode) {
    const responseData = {
        message: message,
        data: data ? data: null,
        status: statuscode
    }
    return res.status(statuscode).json(responseData);
}