/* eslint-disable prettier/prettier */
export enum HttpStatus {
    SUCCESS = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

export enum HttpMessage {
    SUCCESS = "OK",
    CREATED = "Created",
    ACCEPTED = "Accepted",
    NO_CONTENT = "No Content",
    BAD_REQUEST = "Bad Request",
    UNAUTHORIZED = "Unauthorized",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not Found",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    NOT_IMPLEMENTED = "Not Implemented",
    BAD_GATEWAY = "Bad Gateway",
    SERVICE_UNAVAILABLE = "Service Unavailable",
    GATEWAY_TIMEOUT = "Gateway Timeout"
}