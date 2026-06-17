import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const s = {
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 60px)",
    textAlign: "center",
    padding: "2rem",
    background: "linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%)",
  },
  badge: {
    background: "#e0e7ff",
    color: "#4f46e5",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
  },
  h1: { fontSize: "2.8rem", fontWeight: "800", color: "#1e1b4b", marginBottom: "1rem" },
  p: { fontSize: "1.15rem", color: "#6b7280", maxWidth: "600px", lineHeight: "1.7", marginBottom: "2rem" },
  btns: { display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" },
  btnPrimary: {
    background: "#4f46e5",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
  },
  btnSecondary: {
    background: "#fff",
    color: "#4f46e5",
    padding: "12px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    border: "2px solid #4f46e5",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    maxWidth: "800px",
    width: "100%",
    marginTop: "3rem",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 2px 12px rgba(79,70,229,0.1)",
    textAlign: "center",
  },
  icon: { fontSize: "2rem", marginBottom: "0.5rem" },
  cardTitle: { fontWeight: "700", color: "#1e1b4b", marginBottom: "0.3rem" },
  cardText: { color: "#6b7280", fontSize: "0.9rem" },
};

export default function Home() {
  const { user } = useAuth();
  return (
    <div style={s.hero}>
      <div style={s.badge}>TP 8 – Déploiement Full-Stack</div>
      <h1 style={s.h1}>Application Full-Stack<br />React + Express + MongoDB</h1>
      <p style={s.p}>
        Une application web complète avec authentification JWT, gestion des utilisateurs
        et déploiement en production sur Render / Railway.
      </p>
      <div style={s.btns}>
        {user ? (
          <Link to="/dashboard" style={s.btnPrimary}>Aller au Dashboard →</Link>
        ) : (
          <Link to="/login" style={s.btnSecondary}>Se connecter</Link>
        )}
      </div>
    </div>
  );
}
