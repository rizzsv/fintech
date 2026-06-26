import { Router } from "express";
import { loginRateLimiter, refreshRateLimiter } from "../../shared/middleware/rateLimiter.middleware";
import { validateRequest } from "../../shared/middleware/requestValidator.middleware";
import { authController } from "./controllers/auth.controller";
import { loginSchema, logoutSchema, refreshTokenSchema, registerSchema, resendVerificationSchema } from "./validators/auth.validator";
import { authMiddleware } from "../../shared/middleware/auth.middleware";


const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register.bind(authController)
);

router.post(
    "/login",
    loginRateLimiter,
    validateRequest(loginSchema),
    authController.login.bind(authController)
);

router.post(
  "/refresh",
  refreshRateLimiter,
  validateRequest(refreshTokenSchema),
  authController.refresh.bind(authController)
);

router.post(
  "/logout",
  validateRequest(logoutSchema),
  authController.logout.bind(authController)
);

router.get(
  "/me",
  authMiddleware,
  authController.me.bind(authController)
)

router.post(
  "/logout-all",
  authMiddleware,
  authController.logoutAll.bind(authController)
)

router.post(
  "/resend-verification",
  validateRequest(resendVerificationSchema),
  authController.resendVerificationEmail.bind(authController)
)

export default router;