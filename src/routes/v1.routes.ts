import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import walletRoutes from "../modules/wallet/wallet.routes";
import transactionRoutes from "../modules/transaction/transaction.route";


const router = Router();

router.use("/auth", authRoutes);
router.use("/wallet", walletRoutes);
router.use("/transaction", transactionRoutes);


export default router;