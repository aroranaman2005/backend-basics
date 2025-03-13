// provides a standard way to handle errors in the API.

class ApiError extends Error {   //Creates a custom error class that inherits from Error.
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = "",
    ){
        super(message)  //super() is used to call the constructor of the parent class.
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        
        if (stack) {
            this.stack = stack;   
        }else{
            Error.captureStackTrace(this, this.constructor); // Generate a stack trace - Error.captureStackTrace(targetObject, constructorOpt);
        }
    }
}
export {ApiError}