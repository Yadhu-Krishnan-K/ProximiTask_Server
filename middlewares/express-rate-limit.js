import {rateLimit} from 'express-rate-limit'
import CustomError from '../config/CustomError.js'

const limiter = rateLimit({
    max: 5,
    windowMs: 60 * 1000 ,
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    handler: (req, res, next, options) => {
        // Instead of sending a response, pass the custom error to next()
        return next( CustomError.tooManyRequests('Too many requests. Please try again later.'))
    },
})
export default limiter