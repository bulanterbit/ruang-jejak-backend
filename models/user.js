// models/user.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, //
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, //
      },
    },
    {
      timestamps: true, //
      tableName: "users", //
    }
  );

  // Mendefinisikan Asosiasi dengan Model Lain
  User.associate = (models) => {
    // User 'has many' JurnalPerjalanan
    User.hasMany(models.JurnalPerjalanan, {
      foreignKey: {
        name: "userId", // Nama kolom foreign key di tabel jurnal_perjalanan
        allowNull: false,
      },
      as: "jurnals", // Alias untuk relasi ini (opsional, tapi berguna saat query)
      onDelete: "CASCADE", // Jika User dihapus, semua JurnalPerjalanan terkait juga akan dihapus.
    });
  };

  return User;
};
