export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 56px)",
        gap: "1.5rem",
        background: "#f9fafb",
      }}
    >
      {/* Spinning ring */}
      <div
        style={{
          width: "52px",
          height: "52px",
          border: "5px solid #e9d5ff",
          borderTop: "5px solid #a21caf",
          borderRadius: "50%",
          animation: "spin 0.9s linear infinite",
        }}
      />

      <p style={{ fontSize: "15px", color: "#374151", fontWeight: 500, margin: 0 }}>
        Loading map...
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "12px 20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          maxWidth: "320px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "22px" }}>📍</span>
        <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
          Click any <strong style={{ color: "#a21caf" }}>pin</strong> on the map to see all events happening in that city.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
