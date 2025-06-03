import { DataTypes } from "sequelize";

export default (sequelize) => {
  const JurnalPerjalanan = sequelize.define(
    "JurnalPerjalanan", // Nama model (biasanya singular, PascalCase)
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Judul tidak boleh kosong",
          },
        },
      },
      isi: {
        type: DataTypes.TEXT, // Cocok untuk konten yang panjang
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Isi jurnal tidak boleh kosong",
          },
        },
      },
      tanggal_perjalanan: {
        type: DataTypes.DATEONLY, // Hanya menyimpan tanggal, tanpa waktu
        allowNull: false,
      },
      lokasi: {
        type: DataTypes.STRING,
        allowNull: true, // Lokasi bisa opsional
      },
      pengeluaran: {
        type: DataTypes.DECIMAL(10, 2), // Untuk nilai mata uang, misal 12345678.90
        allowNull: true,
        defaultValue: 0.0,
        validate: {
          isDecimal: {
            msg: "Format pengeluaran tidak valid",
          },
          min: {
            args: [0],
            msg: "Pengeluaran tidak boleh negatif",
          },
        },
      },
      // Foreign Key untuk User
      // Kolom ini akan secara otomatis dibuat atau dihubungkan oleh Sequelize
      // ketika kita mendefinisikan asosiasi 'belongsTo' User.
      // Namun, mendefinisikannya di sini memberikan kejelasan dan kontrol tipe data.
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // 'references' bisa ditambahkan di sini, tapi lebih umum didefinisikan
        // secara implisit melalui asosiasi di bawah atau di file models/index.js
      },
    },
    {
      timestamps: true, // Otomatis menambahkan kolom createdAt dan updatedAt
      tableName: "jurnal_perjalanan", // Nama tabel di database (biasanya plural, snake_case)
      // Anda bisa menambahkan indexes di sini jika diperlukan untuk performa query
      // indexes: [
      //   {
      //     fields: ['userId']
      //   }
      // ]
    }
  );

  // Mendefinisikan Asosiasi dengan Model Lain
  // Fungsi 'associate' ini biasanya dipanggil dari file models/index.js
  // setelah semua model diinisialisasi.
  JurnalPerjalanan.associate = (models) => {
    // JurnalPerjalanan 'milik' satu User
    JurnalPerjalanan.belongsTo(models.User, {
      foreignKey: {
        name: "userId", // Nama kolom foreign key di tabel jurnal_perjalanan
        allowNull: false,
      },
      as: "user", // Alias untuk relasi ini (opsional, tapi berguna saat query)
      onDelete: "CASCADE", // Jika User dihapus, semua JurnalPerjalanan terkait juga akan dihapus.
      // Opsi lain: 'SET NULL' (jika userId allowNull: true), 'RESTRICT'
    });
  };

  return JurnalPerjalanan;
};
