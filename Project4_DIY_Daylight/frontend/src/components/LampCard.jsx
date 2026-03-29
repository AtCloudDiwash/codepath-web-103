import { useNavigate } from 'react-router-dom';

export default function LampCard({ lamp, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirm(`Delete "${lamp.name}"?`)) return;
    try {
      const res = await fetch(`/lamps/${lamp.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      onDelete(lamp.id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      onClick={() => navigate(`/lamps/${lamp.id}`)}
      className="bg-slate-800 border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-amber-400 transition group"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-amber-400 font-bold text-lg group-hover:underline">{lamp.name}</h3>
        <span className="text-green-400 font-semibold text-sm">${lamp.total_price}</span>
      </div>
      <div className="text-slate-400 text-sm space-y-2">
        <p><span className="text-slate-300">Bulb:</span> {lamp.bulb_type}</p>
        <p><span className="text-slate-300">Shade:</span> {lamp.shade_style}</p>
        <p><span className="text-slate-300">Base:</span> {lamp.base_material}</p>
        <p><span className="text-slate-300">Color:</span> {lamp.color_temp}</p>
        <p><span className="text-slate-300">Brightness:</span> {lamp.brightness}</p>
      </div>
      <div className="mt-5 flex gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/lamps/${lamp.id}`); }}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2.5 rounded-lg transition font-medium"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-900 hover:bg-red-700 text-white text-sm px-4 py-2.5 rounded-lg transition font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
