import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const s = {
  nav: {
    background: "#4f46e5",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  brand: { color: "#fff", textDecoration: "none", fontWeight: "700", fontSize: "1.3rem" },
  links: { display: "flex", gap: "1.2rem", alignItems: "center" },
  link: { color: "#c7d2fe", textDecoration: "none", fontSize: "0.95rem" },
  btn: {
    background: "#fff",
    color: "#4f46e5",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  user: { color: "#c7d2fe", fontSize: "0.9rem" },
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={s.nav}>
      <Link to="/" style={s.brand}>🚀 FullStack App</Link>
      <div style={s.links}>
        {user ? (
          <>
            <Link to="/dashboard" style={s.link}>Dashboard</Link>
            <Link to="/profile" style={s.link}>Profil</Link>
            {user.role === "admin" && <Link to="/users" style={s.link}>Utilisateurs</Link>}
            <span style={s.user}>👤 {user.name}</span>
            <button style={s.btn} onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" style={s.link}>Connexion</Link>
            <Link to="/register" style={{ ...s.link, color: "#fff", fontWeight: "600" }}>
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
