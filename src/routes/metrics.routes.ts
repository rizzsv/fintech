import { Router } from "express";
import { register } from "../shared/metrics/metrics";

const router = Router();

router.get("/", async (_, res) => {

    res.set(
        "Content-Type",
        register.contentType
    );

    res.end(
        await register.metrics()
    );

});

export default router;