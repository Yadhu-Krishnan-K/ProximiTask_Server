class CustomError extends Error{
    constructor( statusCode, message ){
        super(message);
        this.statusCode = statusCode;
        this.success = false
    }
    static badRequest(msg){
        return new CustomError(400, msg || "Bad Request");
    }
      
    static unauthorized(msg) {
        return new CustomError(401, msg || "Unauthorized");
    }
      
    static forbidden(msg) {
        return new CustomError(403, msg || "Forbidden");
    }
      
    static notFound(msg) {
        return new CustomError(404, msg || "Not Found");
    }
    static conflict(msg) {
        return new CustomError(409, msg || "Conflict");
    }
    
    static tooManyRequests(msg){
        return new CustomError(429, msg || "Too many requests, please try after some time!")
    }
    
    static internalError(msg) {
        return new CustomError(500, msg || "internal Server Error");
    }
}

export default CustomError