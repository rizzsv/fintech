import rateLimit from "express-rate-limit";

const isDevelopment =
  process.env.NODE_ENV === "development";

const isTest =
  process.env.NODE_ENV === "test";

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  // Development & Test
  max: (isDevelopment || isTest) ? 100000 : 100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    status: "error",
    code: "TOO_MANY_REQUESTS",
    message: "Too many requests, please try again later.",
  },
});

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  // Development & Test
  max: (isDevelopment || isTest) ? 100000 : 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    status: "error",
    code: "TOO_MANY_LOGIN_ATTEMPTS",
    message: "Try again later",
  },
});

export const refreshRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,

  // Development & Test
  max: (isDevelopment || isTest) ? 100000 : 20,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    status: "error",
    code: "TOO_MANY_REFRESH_REQUESTS",
    message: "Try again later",
  },
});