// authMiddleware.js
import jwt from "jsonwebtoken";
// `import 'dotenv/config'` tidak perlu di sini jika sudah di `models/index.js` atau `server.js`
// Namun, aman untuk memilikinya jika file ini bisa dijalankan/diuji secara terpisah.
// Untuk konsistensi, pastikan JWT_SECRET sudah dimuat.
// Jika `server.js` atau `models/index.js` sudah `import 'dotenv/config'`, process.env akan terisi.

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
