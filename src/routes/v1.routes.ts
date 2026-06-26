import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import walletRoutes from "../modules/wallet/wallet.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/wallet", walletRoutes);

export default router;