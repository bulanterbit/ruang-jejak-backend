// models/index.js
import dotenv from "dotenv";
dotenv.config(); //

import { Sequelize } from "sequelize"; //

import defineUserModel from "./user.js"; //
import defineJournalModel from "./jurnal.js"; // Import JurnalPerjalanan model definition

const sequelize = new Sequelize(
  process.env.DB_NAME, //
  process.env.DB_USER, //
  process.env.DB_PASSWORD, //
  {
    host: process.env.DB_HOST, //
    dialect: process.env.DB_DIALECT || "mysql", //
    logging: false, // Set true untuk melihat query SQL
  }
);

const db = {};

db.Sequelize = Sequelize; // Kelas Sequelize itu sendiri
db.sequelize = sequelize; // Instans koneksi Sequelize

// Load models
db.User = defineUserModel(sequelize); //
db.JurnalPerjalanan = defineJournalModel(sequelize); // Load JurnalPerjalanan model

// Call associate methods if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName] && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
