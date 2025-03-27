import {rateLimit} from 'express-rate-limit'

const limiter = rateLimit({
    max: 5,
    windowMs: 60 * 1000 ,
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})
export default limiter