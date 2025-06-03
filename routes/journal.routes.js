// routes/journalRoutes.js
import express from "express";
import authenticateToken from "../auth.middleware.js"; //
import db from "../models/index.js";

const router = express.Router();
const { JurnalPerjalanan, User } = db; // Destructure models

// GET all journals for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const journals = await JurnalPerjalanan.findAll({
      where: { userId: req.user.userId }, //
      // Optionally, include user details if needed, though typically not for a list owned by the user
      // include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
      order: [["tanggal_perjalanan", "DESC"]], // Example ordering
    });
    res.json(journals);
  } catch (error) {
    console.error("Error fetching journals:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch journals", error: error.message });
  }
});

// POST a new journal for the authenticated user
router.post("/", authenticateToken, async (req, res) => {
  const { judul, isi, tanggal_perjalanan, lokasi, pengeluaran } = req.body;
  const userId = req.user.userId; //

  if (!judul || !isi || !tanggal_perjalanan) {
    return res
      .status(400)
      .json({ message: "Judul, isi, and tanggal_perjalanan are required" });
  }

  try {
    const newJournal = await JurnalPerjalanan.create({
      judul, //
      isi, //
      tanggal_perjalanan, //
      lokasi, //
      pengeluaran: pengeluaran || 0.0, //
      userId, //
    });
    res
      .status(201)
      .json({ message: "Journal created successfully", journal: newJournal });
  } catch (error) {
    console.error("Error creating journal:", error);
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({
          message: "Validation error",
          errors: error.errors.map((e) => e.message),
        });
    }
    res
      .status(500)
      .json({ message: "Failed to create journal", error: error.message });
  }
});

// GET a specific journal by ID for the authenticated user
router.get("/:id", authenticateToken, async (req, res) => {
  const journalId = req.params.id;
  const userId = req.user.userId; //

  try {
    const journal = await JurnalPerjalanan.findOne({
      where: { id: journalId, userId: userId },
      // include: [{ model: User, as: 'user', attributes: ['id', 'username'] }] // Optional
    });

    if (!journal) {
      return res
        .status(404)
        .json({
          message: "Journal not found or you do not have permission to view it",
        });
    }
    res.json(journal);
  } catch (error) {
    console.error("Error fetching journal:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch journal", error: error.message });
  }
});

// PUT (update) a specific journal by ID for the authenticated user
router.put("/:id", authenticateToken, async (req, res) => {
  const journalId = req.params.id;
  const userId = req.user.userId; //
  const { judul, isi, tanggal_perjalanan, lokasi, pengeluaran } = req.body;

  try {
    const journal = await JurnalPerjalanan.findOne({
      where: { id: journalId, userId: userId },
    });

    if (!journal) {
      return res
        .status(404)
        .json({
          message:
            "Journal not found or you do not have permission to update it",
        });
    }

    // Update fields if they are provided
    if (judul !== undefined) journal.judul = judul; //
    if (isi !== undefined) journal.isi = isi; //
    if (tanggal_perjalanan !== undefined)
      journal.tanggal_perjalanan = tanggal_perjalanan; //
    if (lokasi !== undefined) journal.lokasi = lokasi; //
    if (pengeluaran !== undefined) journal.pengeluaran = pengeluaran; //

    await journal.save(); // This will trigger validations

    res.json({ message: "Journal updated successfully", journal });
  } catch (error) {
    console.error("Error updating journal:", error);
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({
          message: "Validation error",
          errors: error.errors.map((e) => e.message),
        });
    }
    res
      .status(500)
      .json({ message: "Failed to update journal", error: error.message });
  }
});

// DELETE a specific journal by ID for the authenticated user
router.delete("/:id", authenticateToken, async (req, res) => {
  const journalId = req.params.id;
  const userId = req.user.userId; //

  try {
    const journal = await JurnalPerjalanan.findOne({
      where: { id: journalId, userId: userId },
    });

    if (!journal) {
      return res
        .status(404)
        .json({
          message:
            "Journal not found or you do not have permission to delete it",
        });
    }

    await journal.destroy();
    res.json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.error("Error deleting journal:", error);
    res
      .status(500)
      .json({ message: "Failed to delete journal", error: error.message });
  }
});

export default router;
