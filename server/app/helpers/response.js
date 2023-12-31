// These functions are accrosed the project frequently
const handleResponse = (res, error) => {
    const { statusCode, ...response } = error;
    return res.status(statusCode).json({ ...response });
};

const InternalServerError = (res, error) => {
    const errorResponse = { error: { statusCode: 500, status: "Failed", error: "We encountered an issue while processing your request. Please try again later or contact support if the problem persists", errorMessage: error.message } }
    return handleResponse(res, errorResponse.error)
}

const unAuthenticateResponse = (res, error) => {
    const errorResponse = { error: { statusCode: 401, status: "Failed", error: "Cant Proceed, because you are Unauthorized.", errorMessage: error.message } }
    return handleResponse(res, errorResponse.error)
}

const successfulResponse = (res, data) => {
    const response = { message: { statusCode: 200, status: "Success", ...data } }
    return handleResponse(res, response.message)
}

const createResponse = (res, data) => {
    const response = { message: { statusCode: 201, status: "Success", ...data } }
    return handleResponse(res, response.message)
}

module.exports = {
    handleResponse,
    InternalServerError,
    unAuthenticateResponse,
    successfulResponse,
    createResponse
}