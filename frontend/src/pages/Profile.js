import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const s = {
  page: { maxWidth: "600px", margin: "0 auto", padding: "2rem 1rem" },
  h1: { fontSize: "1.8rem", fontWeight: "800", color: "#1e1b4b", marginBottom: "0.3rem" },
  sub: { color: "#6b7280", marginBottom: "2rem" },
  card: { background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" },
  label: { display: "block", fontWeight: "600", color: "#374151", marginBottom: "0.4rem", fontSize: "0.9rem" },
  input: { width: "100%", padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "1rem", outline: "none", marginBottom: "1.2rem" },
  btn: { padding: "10px 24px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" },
  success: { background: "#d1fae5", color: "#065f46", padding: "10px 14px", borderRadius: "8px", marginBottom: "1rem" },
  error: { background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", marginBottom: "1rem" },
};

export default function Profile() {
  const { user, token } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setErr(""); setLoading(true);
    try {
      const res = await axios.put(`/api/users/${user._id}`, form);
      setMsg("Profil mis à jour avec succès ✅");
    } catch (error) {
      setErr(error.response?.data?.message || "Erreur de mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Mon Profil 👤</h1>
      <p style={s.sub}>Modifiez vos informations personnelles</p>
      <div style={s.card}>
        {msg && <div style={s.success}>{msg}</div>}
        {err && <div style={s.error}>⚠️ {err}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Nom complet</label>
          <input style={s.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <label style={s.label}>Email</label>
          <input style={s.input} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <label style={s.label}>Rôle</label>
          <input style={{ ...s.input, background: "#f9fafb", color: "#6b7280" }} value={user?.role} disabled />
          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </form>
      </div>
    </div>
  );
}
