const errorHandler = (err, req, res, next) => {
    if (err.status === 429) {
        return res.status(429).json({ message: "Too many requests, slow down!" });
    }
    console.error(err.stack)

    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error'

    res.status(statusCode).json({
        success:false,
        error:message
    })
}

export default errorHandler