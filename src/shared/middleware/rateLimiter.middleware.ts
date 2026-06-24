import rateLimit from 'express-rate-limit';

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        status: "error",
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests, please try again later.",
    }
})

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  standardHeaders: true,

  message: {
    status: "error",
    code: "TOO_MANY_LOGIN_ATTEMPTS",
    message: "Try again later"
  }
});

export const refreshRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,

  max: 20,

  standardHeaders: true,

  message: {
    status: "error",
    code: "TOO_MANY_REFRESH_REQUESTS",
    message: "Try again later"
  }
});