const express = require("express");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// @route  GET /api/users
// @desc   Liste tous les utilisateurs (authentifiés)
// @access Private
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// @route  GET /api/users/:id
// @desc   Obtenir un utilisateur par ID
// @access Private
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// @route  PUT /api/users/:id
// @desc   Mettre à jour un utilisateur
// @access Private
router.put("/:id", protect, async (req, res) => {
  try {
    // Un utilisateur ne peut modifier que son propre profil (sauf admin)
    if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Non autorisé" });
    }

    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Profil mis à jour", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// @route  DELETE /api/users/:id
// @desc   Supprimer un utilisateur
// @access Private/Admin
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
