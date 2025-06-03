// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./models/index.js"; // Impor setup db (termasuk sequelize instance)
import authRoutes from "./routes/auth.routes.js";
import journalRoutes from "./routes/journal.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = db; // Ambil instance sequelize dari db object

// Middleware
app.use(express.json()); // Untuk mem-parsing body request JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);

app.get("/", (req, res) => {
  res.send("Ruang Jejak API with Sequelize and ES Modules is running!");
});

// Penanganan Error Global Sederhana
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Inisialisasi dan start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(
      "Database connection has been established successfully using ESM."
    );

    // Sinkronisasi model (buat tabel jika belum ada)
    // Hati-hati dengan { force: true } atau { alter: true } di produksi
    await sequelize.sync(); // Default: { force: false }
    console.log("All models were synchronized successfully using ESM.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "Unable to connect to the database or start server (ESM):",
      error
    );
    process.exit(1);
  }
}

startServer();
