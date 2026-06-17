require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Sécurité ────────────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false, // désactivé pour permettre le build React
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Trop de requêtes, réessayez plus tard." },
});
app.use("/api/", limiter);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes API ──────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Route de santé
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Serveur opérationnel",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  });
});

// ─── Servir le build React en production ─────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

// ─── Connexion MongoDB ────────────────────────────────────────────────────────
if (!process.env.MONGO_URI) {
  console.error("❌ Erreur: MONGO_URI non défini dans le fichier .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ MongoDB connecté");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur MongoDB :", err.message);
    console.error("💡 Vérifiez:");
    console.error("   - La chaîne MONGO_URI dans .env");
    console.error("   - Votre connexion Internet");
    console.error("   - Les pare-feu/IP whitelist MongoDB Atlas");
    process.exit(1);
  });
