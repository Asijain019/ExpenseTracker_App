import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ratesRouter from "./rates";
import authRouter from "./auth";
import expensesRouter from "./expenses";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ratesRouter);
router.use("/auth", authRouter);
router.use("/expenses", expensesRouter);

export default router;
