import { Router } from "express";

const router = Router();

router.get("/rates", async (req, res) => {
  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=USD");
    if (!response.ok) {
      res.status(502).json({ error: "Failed to fetch exchange rates" });
      return;
    }
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(502).json({ error: "Could not reach exchange rate service" });
  }
});

export default router;
