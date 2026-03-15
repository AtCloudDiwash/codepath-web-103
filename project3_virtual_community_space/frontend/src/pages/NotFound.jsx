import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 56px)",
        gap: "1rem",
        textAlign: "center",
        padding: "0 1rem",
        background: "#f9fafb",
      }}
    >
      <span style={{ fontSize: "72px", lineHeight: 1 }}>🎸</span>

      <h1
        style={{
          fontSize: "6rem",
          fontWeight: 800,
          color: "#a21caf",
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-2px",
        }}
      >
        404
      </h1>

      <p style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", margin: 0 }}>
        This page is off the setlist.
      </p>

      <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "320px", margin: 0 }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div style={{ display: "flex", gap: "12px", marginTop: "0.5rem" }}>
        <Link
          to="/"
          style={{
            background: "#a21caf",
            color: "#fff",
            padding: "10px 22px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Go Home
        </Link>
        <Link
          to="/events"
          style={{
            background: "#fff",
            color: "#a21caf",
            padding: "10px 22px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            border: "1px solid #a21caf",
          }}
        >
          Browse Events
        </Link>
      </div>
    </div>
  );
}
