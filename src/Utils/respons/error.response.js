const errorResponse = ({status=400, message="error",extra=undefined}) => {
    const error = new Error(typeof message === 'string' ? message : message?.message); // Handle both string and object messages
    error.status = status;
    error.extra = extra;
    throw error;
};

export const BadRequestException = ({message = "Bad Request Exception", extra = undefined}) => {
    return errorResponse({status: 400, message, extra});
};
export const ConflictException = ({message = "Conflict Exception", extra = undefined}) => {
    return errorResponse({status: 409, message, extra});
};
export const NotFoundException = ({message = "Not Found Exception", extra = undefined}) => {
    return errorResponse({status: 404, message, extra});
};
export const UnauthorizedException = ({message = "Unauthorized Exception", extra = undefined}) => {
    return errorResponse({status: 401, message, extra});
};
export const ForbiddenException = ({message = "Forbidden Exception", extra = undefined}) => {
    return errorResponse({status: 403, message, extra});
};
export const TooManyRequestsException = ({message = "Too Many Requests Exception", extra = undefined}) => {
    return errorResponse({status: 429, message, extra});
};


// Global error handler for Express
export const globalError = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const extra = err.extra || undefined;
    const stack = err.stack || undefined;
    
    return res.status(status).json({ message, extra ,status,stack });
};
