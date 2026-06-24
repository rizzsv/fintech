import {Router} from 'express';
import {authController} from '../controllers/auth.controller';
import {validateRequest} from '../../../shared/middleware/requestValidator.middleware';
import {registerSchema, loginSchema, refreshTokenSchema, logoutSchema, resendVerificationSchema} from '../validators/auth.validator'
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { loginRateLimiter, refreshRateLimiter } from '../../../shared/middleware/rateLimiter.middleware';

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