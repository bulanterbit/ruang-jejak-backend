// routes/journalRoutes.js
import express from "express";
import authenticateToken from "../authMiddleware.js"; // Impor middleware

const router = express.Router();

// Semua rute di bawah ini akan dilindungi oleh authenticateToken
router.get("/", authenticateToken, (req, res) => {
  res.json({
    message: `Placeholder ESM: Get all journals for user ${req.user.username} (ID: ${req.user.userId})`,
  });
});

router.post("/", authenticateToken, (req, res) => {
  res
    .status(201)
    .json({
      message: `Placeholder ESM: Create a new journal for user ${req.user.username}`,
    });
});

router.get("/:id", authenticateToken, (req, res) => {
  const journalId = req.params.id;
  res.json({
    message: `Placeholder ESM: Get journal with ID ${journalId} for user ${req.user.username}`,
  });
});

router.put("/:id", authenticateToken, (req, res) => {
  const journalId = req.params.id;
  res.json({
    message: `Placeholder ESM: Update journal with ID ${journalId} for user ${req.user.username}`,
  });
});

router.delete("/:id", authenticateToken, (req, res) => {
  const journalId = req.params.id;
  res.json({
    message: `Placeholder ESM: Delete journal with ID ${journalId} for user ${req.user.username}`,
  });
});

export default router;
