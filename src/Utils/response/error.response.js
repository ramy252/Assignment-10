export const errorResponse = ({
  status = 500,
  message = "Internal Server Error",
  extra = null,
}) => {
  const error = new Error(typeof message === "string"? message: message?.message || "Internal Server Error");
  error.statusCode = status;
  error.extra = extra;
  throw error;
};

export const BadRequestException = ({ message = "BadRequestException", extra = null }) => {
  return errorResponse({ status: 400, message, extra });
};
export const UnauthorizedException = ({ message = "UnauthorizedException", extra = null }) => {
  return errorResponse({ status: 401, message, extra });
};
export const ForbiddenException = ({ message = "ForbiddenException", extra = null }) => {
  return errorResponse({ status: 403, message, extra });
};
export const NotFoundException = ({ message = "NotFoundException", extra = null }) => {
  return errorResponse({ status: 404, message, extra });
};
export const ConflictException = ({ message = "ConflictException", extra = null }) => {
  return errorResponse({ status: 409, message, extra });
};
export const TooManyRequestsException = ({ message = "TooManyRequestsException", extra = null }) => {
  return errorResponse({ status: 429, message, extra });
};

export const globalException = (err, req, res, next) => {const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const extra = err.extra || null;
  return res.status(status).json({
    success: false,
    message: message,
    extra: extra,
    stack: err.stack,
    status: status,
  });
};
