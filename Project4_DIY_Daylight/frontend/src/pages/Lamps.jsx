import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LampCard from '../components/LampCard';
import Loader from '../components/Loader';

export default function Lamps() {
  const [lamps, setLamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/lamps')
      .then((res) => res.json())
      .then(({ data }) => setLamps(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    setLamps((prev) => prev.filter((l) => l.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900 px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-amber-400">My Lamps</h1>
          <button
            onClick={() => navigate('/builder')}
            className="bg-amber-400 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-amber-300 transition"
          >
            + Build New
          </button>
        </div>

        {lamps.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <p className="text-lg mb-6">No lamps saved yet.</p>
            <button
              onClick={() => navigate('/builder')}
              className="text-amber-400 underline hover:text-amber-300"
            >
              Build your first lamp
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lamps.map((lamp) => (
              <LampCard key={lamp.id} lamp={lamp} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
