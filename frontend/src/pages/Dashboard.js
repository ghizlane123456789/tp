import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUsers, deleteUser } from "../services/api";

const styles = {
  page: { maxWidth: "960px", margin: "0 auto", padding: "2rem 1rem" },
  header: { marginBottom: "2rem" },
  h1: { fontSize: "2rem", fontWeight: "800", color: "#1e1b4b" },
  sub: { color: "#4b5563", marginTop: "0.75rem" },
  section: { background: "#fff", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.08)" },
  sectionTitle: { fontSize: "1.15rem", fontWeight: "700", color: "#111827", marginBottom: "1rem" },
  loading: { color: "#6b7280" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "0.9rem 1rem", background: "#f3f4f6", color: "#111827", fontWeight: "700" },
  tr: { borderBottom: "1px solid #e5e7eb" },
  td: { padding: "0.9rem 1rem", color: "#374151" },
  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "0.5rem 0.9rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        const allUsers = Array.isArray(data) ? data : data.users || [];
        console.log("✅ Utilisateurs chargés:", allUsers);
        setUsers(allUsers);
      })
      .catch((error) => {
        console.error("❌ Erreur chargement utilisateurs:", error);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer l'utilisateur.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Dashboard</h1>
        <p style={styles.sub}>Bienvenue, {user?.name || "utilisateur"}.</p>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Utilisateurs enregistrés ({users.length})</div>

        {loading ? (
          <p style={styles.loading}>Chargement...</p>
        ) : users.length === 0 ? (
          <p style={styles.loading}>Aucun utilisateur enregistré pour le moment.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Rôle</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={styles.tr}>
                  <td style={styles.td}>{u.name}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>{u.role}</td>
                  <td style={styles.td}>
                    {u._id !== user?._id && (
                      <button onClick={() => handleDelete(u._id)} style={styles.deleteBtn}>
                        Supprimer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
