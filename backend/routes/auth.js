const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Générer un JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @route  POST /api/auth/register
// @desc   Inscription
// @access Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "Inscription réussie. Veuillez vous connecter.",
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("❌ Erreur inscription:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// @route  POST /api/auth/login
// @desc   Connexion
// @access Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    res.json({
      message: "Connexion réussie",
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// @route  GET /api/auth/me
// @desc   Profil de l'utilisateur connecté
// @access Private
router.get("/me", protect, async (req, res) => {
  res.json({ user: req.user });
});

// @route  POST /api/auth/logout
// @desc   Déconnexion (côté client)
// @access Private
router.post("/logout", protect, (req, res) => {
  res.json({ message: "Déconnexion réussie" });
});

module.exports = router;
