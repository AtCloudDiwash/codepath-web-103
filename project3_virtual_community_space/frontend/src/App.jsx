import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Event from "./pages/Event";
import NotFound from "./pages/NotFound";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-8">
      <span className="text-xl font-bold tracking-wide text-fuchsia-400 cursor-pointer">Music Pulse</span>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "text-fuchsia-400 font-semibold" : "hover:text-fuchsia-400 transition"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive ? "text-fuchsia-400 font-semibold" : "hover:text-fuchsia-400 transition"
        }
      >
        Events
      </NavLink>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventName" element={<Event />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
