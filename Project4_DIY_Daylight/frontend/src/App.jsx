import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Lamps from './pages/Lamps';
import Lamp from './pages/Lamp';
import NotFound from './pages/NotFound';

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-5 flex items-center justify-center gap-10 border-b border-slate-700">
      <span className="text-xl font-bold tracking-wide text-amber-400">DIY Daylight</span>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? 'text-amber-400 font-semibold' : 'hover:text-amber-400 transition'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/builder"
        className={({ isActive }) =>
          isActive ? 'text-amber-400 font-semibold' : 'hover:text-amber-400 transition'
        }
      >
        Build a Lamp
      </NavLink>
      <NavLink
        to="/lamps"
        className={({ isActive }) =>
          isActive ? 'text-amber-400 font-semibold' : 'hover:text-amber-400 transition'
        }
      >
        My Lamps
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
        <Route path="/builder" element={<Builder />} />
        <Route path="/lamps" element={<Lamps />} />
        <Route path="/lamps/:id" element={<Lamp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
