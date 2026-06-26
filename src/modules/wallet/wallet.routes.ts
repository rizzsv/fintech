import { Router } from "express";

import { authMiddleware } from "../../shared/middleware/auth.middleware";

import { walletController } from "./controllers/wallet.controller";

const router = Router();

router.use(authMiddleware);

router.get(
  "/",
  walletController.getWallet.bind(walletController)
);

router.get(
  "/balance",
  walletController.getBalance.bind(walletController)
);

router.get(
  "/limits",
  walletController.getLimits.bind(walletController)
);

router.get(
  "/ledger",
  walletController.getLedger.bind(walletController)
);

export default router;