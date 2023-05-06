const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data)

const error = (res) => responseWithData(res, 500, {
    status: 500,
    message: "Ooops! something is wrong"
});

const badRequest = (res, message) => responseWithData(res, 400, {
    status: 400,
    message
});

const okay =(res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const unAuthorize = (res) => responseWithData(res, 401, {
    status: 401,
    message: "Ooops Unathorized"
});

const notFound = () => responseWithData(res, 404, {
    status: 404,
    message: "Ooops Reasouce not found"
});

export default {
    error, badRequest, okay, created, unAuthorize, notFound
}

