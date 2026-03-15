import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function formatDateTime(isoString) {
  if (!isoString) return null;
  return new Date(isoString).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function useCountdown(startTime) {
  const [countdown, setCountdown] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!startTime) return;

    const target = new Date(startTime).getTime();

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        setCountdown(null);
        clearInterval(intervalRef.current);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(
        `${d > 0 ? `${d}d ` : ""}${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
      );
    }

    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current);
  }, [startTime]);

  return countdown;
}

export default function Event() {
  const { eventName } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const countdown = useCountdown(event?.start_time);

  useEffect(() => {
    fetch(`${BACKEND_URL}/events/${encodeURIComponent(eventName)}`)
      .then((res) => res.json())
      .then(({ data, error }) => {
        if (error) setError(error);
        else setEvent(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [eventName]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "16rem", color: "#6b7280" }}>
        Loading event...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem 1rem" }}>
        <p style={{ color: "#ef4444", marginBottom: "1rem" }}>Event not found.</p>
        <Link to="/events" style={{ color: "#a21caf", textDecoration: "underline" }}>
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "2rem 1rem" }}>
      <Link to="/events" style={{ color: "#a21caf", textDecoration: "underline", fontSize: "14px", display: "block", marginBottom: "1.5rem" }}>
        ← Back to Events
      </Link>

      {/* Title & Category */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
          {event.title}
        </h1>
        {event.category && (
          <span
            style={{
              display: "inline-block",
              background: "#f3e8ff",
              color: "#7e22ce",
              padding: "2px 12px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {event.category}
          </span>
        )}
      </div>

      {/* Countdown / status */}
      {event.start_time && countdown !== null && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
          <span style={{ background: "#fef9c3", color: "#854d0e", fontSize: "11px", fontWeight: 700, padding: "2px 10px", borderRadius: "9999px", letterSpacing: "0.05em" }}>
            UPCOMING
          </span>
          <span style={{ fontFamily: "monospace", fontSize: "15px", fontWeight: 600, color: "#111827" }}>
            {countdown}
          </span>
        </div>
      )}

      {/* Details grid */}
      <div
        style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {event.band_name && (
          <Row label="Band" value={event.band_name} />
        )}
        {event.city && (
          <Row label="City" value={event.city} />
        )}
        {event.location && (
          <Row label="Venue" value={event.location} />
        )}
        {event.address && (
          <Row label="Address" value={event.address} />
        )}
        {event.start_time && (
          <Row label="Starts" value={formatDateTime(event.start_time)} />
        )}
        {event.end_time && (
          <Row label="Ends" value={formatDateTime(event.end_time)} />
        )}
      </div>

      {/* Description */}
      {event.description && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.35rem", color: "#374151" }}>About</p>
          <p style={{ color: "#4b5563", lineHeight: 1.7 }}>{event.description}</p>
        </div>
      )}

      {/* Thumbnail image */}
      {event.music_url && (
        <div style={{ marginBottom: "1.5rem" }}>
          <img src={event.music_url} alt={event.title} style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", fontSize: "14px" }}>
      <span style={{ fontWeight: 600, color: "#374151", minWidth: "80px" }}>{label}:</span>
      <span style={{ color: "#6b7280" }}>{value}</span>
    </div>
  );
}
