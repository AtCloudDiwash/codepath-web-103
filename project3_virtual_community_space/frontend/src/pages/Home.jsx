import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EventCard from "../components/EventCard";

// Fix Leaflet default marker icons broken by bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Predefined city → [lat, lng] coordinate map
const CITY_COORDS = {
  "New York": [40.7128, -74.006],
  "Los Angeles": [34.0522, -118.2437],
  "Chicago": [41.8781, -87.6298],
  "Austin": [30.2672, -97.7431],
  "Nashville": [36.1627, -86.7816],
  "Seattle": [47.6062, -122.3321],
  "Miami": [25.7617, -80.1918],
  "Denver": [39.7392, -104.9903],
  "Boston": [42.3601, -71.0589],
  "Portland": [45.5051, -122.675],
  "San Francisco": [37.7749, -122.4194],
  "Atlanta": [33.749, -84.388],
  "Houston": [29.7604, -95.3698],
  "Phoenix": [33.4484, -112.074],
  "Minneapolis": [44.9778, -93.265],
  "Detroit": [42.3314, -83.0458],
  "Philadelphia": [39.9526, -75.1652],
  "Las Vegas": [36.1699, -115.1398],
  "New Orleans": [29.9511, -90.0715],
  "Dallas": [32.7767, -96.797],
};


export default function Home() {
  const [cityGroups, setCityGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/events`)
      .then((res) => res.json())
      .then(({ data }) => {
        const groups = {};
        (data || []).forEach((event) => {
          const city = event.city;
          // Only pin cities that exist in our coordinate map
          if (!city || !CITY_COORDS[city]) return;
          if (!groups[city]) groups[city] = [];
          groups[city].push(event);
        });
        setCityGroups(groups);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleEventClick = (title) => {
    navigate(`/events/${encodeURIComponent(title)}`);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 56px)",
          color: "#6b7280",
        }}
      >
        Loading map...
      </div>
    );
  }

  return (
    <div style={{ height: "calc(100vh - 56px)" }}>
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.entries(cityGroups).map(([city, events]) => (
          <Marker key={city} position={CITY_COORDS[city]}>
            <Popup minWidth={240} maxWidth={300}>
              <div style={{ maxHeight: "260px", overflowY: "auto", paddingRight: "4px" }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "8px",
                    borderBottom: "2px solid #a21caf",
                    paddingBottom: "4px",
                    color: "#111827",
                  }}
                >
                  {city} — {events.length} event{events.length > 1 ? "s" : ""}
                </p>
                {events.map((event) => (
                  <EventCard
                    key={event.id ?? event.title}
                    event={event}
                    onClick={handleEventClick}
                  />
                ))}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
