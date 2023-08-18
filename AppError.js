class AppError{ // client error (bad request) 

  message; // global var
  statusCode; // global var

  constructor(message, statusCode = 400){ // default 400 (client error)
    this.message = message;
    this.statusCode = statusCode;
  }

}

module.exports = AppError;