import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shade */}
          <polygon points="20,70 100,70 80,20 40,20" fill="#f59e0b" opacity="0.9" />
          {/* Bulb glow */}
          <circle cx="60" cy="85" r="18" fill="#fef3c7" opacity="0.4" />
          {/* Bulb */}
          <circle cx="60" cy="80" r="12" fill="#fef9c3" />
          {/* Stem */}
          <rect x="57" y="92" width="6" height="30" fill="#94a3b8" />
          {/* Base */}
          <ellipse cx="60" cy="125" rx="20" ry="8" fill="#64748b" />
        </svg>
      </div>

      <h1 className="text-5xl font-bold text-amber-400 mb-4">DIY Daylight</h1>
      <p className="text-slate-400 text-lg max-w-md mb-10">
        Design your perfect custom lamp. Choose your bulb, shade, base, and more — then save your creation.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/builder')}
          className="bg-amber-400 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-amber-300 transition"
        >
          Build a Lamp
        </button>
        <button
          onClick={() => navigate('/lamps')}
          className="border border-amber-400 text-amber-400 font-bold px-8 py-3 rounded-lg hover:bg-amber-400 hover:text-slate-900 transition"
        >
          My Lamps
        </button>
      </div>
    </div>
  );
}
