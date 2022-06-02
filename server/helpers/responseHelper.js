var sendSuccessResponse = async ({ res, status = 200, msg = null, data = null, token = null }) => {
    var response = {
        status: status,
        success: true
    }
    if (token != null) response.token = null
    msg ? response.message = msg : response.msg = "No success message   ";
    data ? response.data = data : response.data = {};
    res.status(status).send(response)
}

var sendErrorResponse = async ({ res, status = 500, msg = null, data = null }) => {
    var response = {
        status: status,
        success: false
    }
    if (msg) response.error = msg;
    if (data) response.data = data;
    res.status(status).send(response);
}

module.exports = {
    sendErrorResponse,
    sendSuccessResponse
}   