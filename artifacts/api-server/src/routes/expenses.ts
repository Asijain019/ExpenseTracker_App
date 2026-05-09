import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, expensesTable } from "@workspace/db";
import { authMiddleware, type AuthRequest } from "../middlewares/auth";

const router: IRouter = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res): Promise<void> => {
  try {
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, req.userId!))
      .orderBy(expensesTable.createdAt);
    
    res.json(expenses);
  } catch (error) {
    req.log.error({ error }, "Failed to fetch expenses");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: AuthRequest, res): Promise<void> => {
  const { name, amount, category } = req.body;

  if (!name || amount == null || !category) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const [expense] = await db.insert(expensesTable).values({
      userId: req.userId!,
      name,
      amount: amount.toString(),
      category,
    }).returning();

    res.status(201).json(expense);
  } catch (error) {
    req.log.error({ error }, "Failed to create expense");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req: AuthRequest, res): Promise<void> => {
  const idStr = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(idStr, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid expense ID" });
    return;
  }

  try {
    const [deleted] = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, req.userId!)))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: "Expense not found" });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    req.log.error({ error }, "Failed to delete expense");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
