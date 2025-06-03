// models/index.js
import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

import defineUserModel from "./user.js"; // Tambahkan .js pada impor lokal

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false, // Set true untuk melihat query SQL
  }
);

const db = {};

db.Sequelize = Sequelize; // Kelas Sequelize itu sendiri
db.sequelize = sequelize; // Instans koneksi Sequelize

// Load models
db.User = defineUserModel(sequelize);
// Jika ada model lain (misal Journal):
// import defineJournalModel from './journal.js';
// db.Journal = defineJournalModel(sequelize);

export default db;
