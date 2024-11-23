class BaseError extends Error {
  error_code: string;
  error_description: string;
  statusCode: number;

  constructor(
    error_code: string,
    error_description: string,
    statusCode: number,
  ) {
    super();
    this.error_code = error_code;
    this.error_description = error_description;
    this.statusCode = statusCode;
  }
}

export class BadRequest extends BaseError {
  constructor(error_code: string, error_description: string) {
    super(error_code, error_description, 400);
  }
}

export class NotFound extends BaseError {
  constructor(error_code: string, error_description: string) {
    super(error_code, error_description, 404);
  }
}

export class NotAcceptable extends BaseError {
  constructor(error_code: string, error_description: string) {
    super(error_code, error_description, 406);
  }
}
