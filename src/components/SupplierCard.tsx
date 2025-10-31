import React from "react";
import { useNavigate } from "react-router-dom";

interface SupplierCardProps {
  id: string;
  name: string;
  status: string;
  lastQuery?: string;
}

const statusColors: Record<string, string> = {
  active: "#22c55e",
  pending: "#facc15",
  blocked: "#ef4444",
};

const SupplierCard: React.FC<SupplierCardProps> = ({ id, name, status, lastQuery }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px #e0e0e0",
        padding: "28px 32px 24px 32px",
        margin: "18px auto",
        maxWidth: 420,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "box-shadow 0.2s",
      }}
    >
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontWeight: "bold", fontSize: 20, color: "#222" }}>{name}</div>
        <span
          style={{
            background: statusColors[status] || "#d1d5db",
            color: "#fff",
            borderRadius: 8,
            padding: "6px 14px",
            fontWeight: 600,
            fontSize: 14,
            boxShadow: "0 1px 4px #e0e0e0",
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div style={{ width: "100%", marginBottom: 18, color: "#555", fontSize: 15 }}>
        <span style={{ fontWeight: 500 }}>Supplier ID:</span> {id}
      </div>
      <div style={{ width: "100%", marginBottom: 18, color: "#555", fontSize: 15 }}>
        <span style={{ fontWeight: 500 }}>Last Query:</span> {lastQuery || "None"}
      </div>
      <div style={{ width: "100%", display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          onClick={() => navigate(`/queries?id=${id}`)}
          style={{
            padding: "10px 22px",
            border: "none",
            borderRadius: 8,
            background: "#2563eb",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 15,
            boxShadow: "0 2px 8px #e0e0e0",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          View Queries
        </button>
        <button
          onClick={() => navigate(`/new-query?supplier=${id}`)}
          style={{
            padding: "10px 22px",
            border: "1px solid #2563eb",
            borderRadius: 8,
            background: "#fff",
            color: "#2563eb",
            fontWeight: "bold",
            fontSize: 15,
            boxShadow: "0 2px 8px #e0e0e0",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Raise Query
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;
