import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bands, setBands] = useState([]);
  const [filters, setFilters] = useState({ category: "", city: "", bandname: "" });
  const [loading, setLoading] = useState(false);

  // Load all events once to populate city and band filter options
  useEffect(() => {
    fetch(`${BACKEND_URL}/events`)
      .then((res) => res.json())
      .then(({ data }) => {
        const all = data || [];
        setCities([...new Set(all.map((e) => e.city).filter(Boolean))]);
        setBands([...new Set(all.map((e) => e.band_name).filter(Boolean))]);
        setCategories([...new Set(all.map((e) => e.category).filter(Boolean))]);
      })
      .catch(console.error);
  }, []);

  // Re-fetch from backend whenever filters change
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.city) params.append("city", filters.city);
    if (filters.bandname) params.append("bandname", filters.bandname);

    const hasFilters = filters.category || filters.city || filters.bandname;
    const url = hasFilters
      ? `${BACKEND_URL}/events/filter?${params}`
      : `${BACKEND_URL}/events`;

    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => setEvents(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filters]);

  const handleFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">

        <select
          className="border border-gray-300 rounded px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={filters.category}
          onChange={(e) => handleFilter("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>


        <select
          className="border border-gray-300 rounded px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={filters.city}
          onChange={(e) => handleFilter("city", e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={filters.bandname}
          onChange={(e) => handleFilter("bandname", e.target.value)}
        >
          <option value="">All Bands</option>
          {bands.map((band) => (
            <option key={band} value={band}>{band}</option>
          ))}
        </select>
      </div>

      {/* Event list */}
      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id || event.title}
              to={`/events/${encodeURIComponent(event.title)}`}
              className="block border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-yellow-400 transition"
            >
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="font-bold text-lg leading-tight">{event.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{event.band_name}</p>
              <p className="text-sm text-gray-500">{event.city}</p>
              <span className="inline-block mt-2 text-xs capitalize bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {event.category}
              </span>
              {event.date && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
