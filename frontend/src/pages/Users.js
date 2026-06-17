import React, { useEffect, useState } from "react";
import axios from "axios";

const s = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" },
  h1: { fontSize: "1.8rem", fontWeight: "800", color: "#1e1b4b", marginBottom: "0.3rem" },
  sub: { color: "#6b7280", marginBottom: "2rem" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" },
  th: { background: "#4f46e5", color: "#fff", padding: "12px 16px", textAlign: "left", fontWeight: "600", fontSize: "0.9rem" },
  td: { padding: "12px 16px", borderBottom: "1px solid #f3f4f6", color: "#374151", fontSize: "0.9rem" },
  badge: { padding: "3px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "600" },
  admin: { background: "#fef3c7", color: "#92400e" },
  user: { background: "#e0e7ff", color: "#3730a3" },
  error: { background: "#fee2e2", color: "#dc2626", padding: "1rem", borderRadius: "8px" },
  loading: { textAlign: "center", padding: "3rem", color: "#6b7280" },
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/api/users")
      .then(r => setUsers(r.data.users))
      .catch(e => setError(e.response?.data?.message || "Accès refusé ou erreur serveur"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={s.loading}>Chargement des utilisateurs...</div>;
  if (error) return <div style={{ padding: "2rem" }}><div style={s.error}>⚠️ {error}</div></div>;

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Gestion des utilisateurs 👥</h1>
      <p style={s.sub}>{users.length} utilisateur(s) enregistré(s)</p>
      <table style={s.table}>
        <thead>
          <tr>
            {["Nom", "Email", "Rôle", "Inscription"].map(h => (
              <th key={h} style={s.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td style={s.td}>{u.name}</td>
              <td style={s.td}>{u.email}</td>
              <td style={s.td}>
                <span style={{ ...s.badge, ...(u.role === "admin" ? s.admin : s.user) }}>
                  {u.role}
                </span>
              </td>
              <td style={s.td}>{new Date(u.createdAt).toLocaleDateString("fr-FR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
