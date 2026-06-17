import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const s = {
  page: { minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4ff", padding: "1rem" },
  card: { background: "#fff", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "420px", boxShadow: "0 4px 24px rgba(79,70,229,0.12)" },
  h2: { fontSize: "1.8rem", fontWeight: "800", color: "#1e1b4b", marginBottom: "0.3rem" },
  sub: { color: "#6b7280", marginBottom: "2rem", fontSize: "0.95rem" },
  label: { display: "block", fontWeight: "600", color: "#374151", marginBottom: "0.4rem", fontSize: "0.9rem" },
  input: { width: "100%", padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "1rem", outline: "none", transition: "border 0.2s" },
  field: { marginBottom: "1.2rem" },
  btn: { width: "100%", padding: "12px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "700", cursor: "pointer", marginTop: "0.5rem" },
  error: { background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" },
  link: { textAlign: "center", marginTop: "1.2rem", color: "#6b7280", fontSize: "0.9rem" },
  a: { color: "#4f46e5", fontWeight: "600", textDecoration: "none" },
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h2 style={s.h2}>Connexion 🔐</h2>
        <p style={s.sub}>Connectez-vous à votre compte</p>
        {error && <div style={s.error}>⚠️ {error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input style={s.input} type="email" name="email" placeholder="vous@exemple.com" value={form.email} onChange={handleChange} required />
          </div>
          <div style={s.field}>
            <label style={s.label}>Mot de passe</label>
            <input style={s.input} type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>
          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p style={s.link}>
          Pas de compte ? <Link to="/register" style={s.a}>S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
