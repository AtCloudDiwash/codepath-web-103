export default function EventCard({ event, onClick }) {
  return (
    <div
      onClick={() => onClick(event.title)}
      style={{
        borderBottom: "1px solid #e5e7eb",
        padding: "8px 4px",
        cursor: "pointer",
        borderRadius: "4px",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <p style={{ fontWeight: 600, fontSize: "13px", color: "#111827", margin: "0 0 2px" }}>
        {event.title}
      </p>
      <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 2px" }}>
        {event.band_name}
        {event.category ? ` · ${event.category}` : ""}
      </p>
      {event.date && (
        <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
