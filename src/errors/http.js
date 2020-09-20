class HttpError extends Error {
  constructor(statusCode, message, ...params) {
    super(message, ...params);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
