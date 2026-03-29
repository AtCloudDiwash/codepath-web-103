import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LampVisual from '../components/LampVisual';
import FeatureSelector from '../components/FeatureSelector';
import Loader from '../components/Loader';

const FEATURES = {
  bulb_type: {
    label: 'Bulb Type',
    options: [
      { value: 'LED', label: 'LED', price: 15 },
      { value: 'Incandescent', label: 'Incandescent', price: 5 },
      { value: 'Fluorescent', label: 'Fluorescent', price: 10 },
      { value: 'Smart', label: 'Smart', price: 30 },
    ],
  },
  shade_style: {
    label: 'Shade Style',
    options: [
      { value: 'Drum', label: 'Drum', price: 20 },
      { value: 'Empire', label: 'Empire', price: 25 },
      { value: 'Bell', label: 'Bell', price: 22 },
      { value: 'No Shade', label: 'No Shade', price: 0 },
    ],
  },
  base_material: {
    label: 'Base Material',
    options: [
      { value: 'Wood', label: 'Wood', price: 18 },
      { value: 'Metal', label: 'Metal', price: 22 },
      { value: 'Ceramic', label: 'Ceramic', price: 28 },
      { value: 'Glass', label: 'Glass', price: 35 },
    ],
  },
  color_temp: {
    label: 'Color Temperature',
    options: [
      { value: 'Warm White', label: 'Warm White', price: 0 },
      { value: 'Cool White', label: 'Cool White', price: 5 },
      { value: 'Daylight', label: 'Daylight', price: 8 },
      { value: 'RGB', label: 'RGB', price: 20 },
    ],
  },
  brightness: {
    label: 'Brightness',
    options: [
      { value: 'Low', label: 'Low', price: 0 },
      { value: 'Medium', label: 'Medium', price: 5 },
      { value: 'High', label: 'High', price: 10 },
      { value: 'Ultra', label: 'Ultra', price: 18 },
    ],
  },
};

const BASE_PRICE = 20;

function getPrice(selections) {
  let total = BASE_PRICE;
  for (const [key, value] of Object.entries(selections)) {
    const feature = FEATURES[key];
    const opt = feature?.options.find((o) => o.value === value);
    if (opt) total += opt.price;
  }
  return total;
}

function getIncompatibilityError(selections) {
  if (selections.bulb_type === 'Incandescent' && selections.brightness === 'Ultra') {
    return 'Incandescent bulbs cannot be used with Ultra brightness — fire hazard!';
  }
  if (selections.shade_style === 'No Shade' && selections.color_temp === 'RGB') {
    return 'No Shade with RGB color is not allowed — too much glare!';
  }
  return null;
}

export default function Lamp() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lamp, setLamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [selections, setSelections] = useState({});
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`/lamps/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setLamp(data);
        setName(data.name);
        setSelections({
          bulb_type: data.bulb_type,
          shade_style: data.shade_style,
          base_material: data.base_material,
          color_temp: data.color_temp,
          brightness: data.brightness,
        });
      })
      .catch(() => navigate('/lamps'))
      .finally(() => setLoading(false));
  }, [id]);

  const incompatError = getIncompatibilityError(selections);
  const totalPrice = getPrice(selections);

  const handleChange = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    setError('');
    setSuccess('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError('Lamp name is required.');
    if (incompatError) return setError(incompatError);

    setSaving(true);
    try {
      const res = await fetch(`/lamps/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selections, name: name.trim(), total_price: totalPrice }),
      });
      const json = await res.json();
      if (!res.ok) return setError(json.error || 'Update failed.');
      setSuccess('Lamp updated successfully!');
    } catch {
      setError('Network error. Is the backend running?');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/lamps/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      navigate('/lamps');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (loading) return <Loader />;
  if (!lamp) return null;

  return (
    <div className="min-h-screen bg-slate-900 px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/lamps')}
          className="text-slate-400 hover:text-amber-400 mb-8 inline-flex items-center gap-2 transition px-2 py-1"
        >
          ← Back to My Lamps
        </button>

        <h1 className="text-3xl font-bold text-amber-400 mb-10">Edit Lamp</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Edit Form */}
          <div className="flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <form onSubmit={handleUpdate}>
              <div className="mb-8">
                <label className="text-slate-300 font-semibold block mb-3">Lamp Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400"
                />
              </div>

              {Object.entries(FEATURES).map(([key, { label, options }]) => (
                <FeatureSelector
                  key={key}
                  label={label}
                  options={options}
                  selected={selections[key]}
                  onChange={(val) => handleChange(key, val)}
                />
              ))}

              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 rounded-lg px-4 py-3 mb-4 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-900/50 border border-green-500 text-green-300 rounded-lg px-4 py-3 mb-4 text-sm">
                  {success}
                </div>
              )}

              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  disabled={saving || !!incompatError}
                  className="flex-1 bg-amber-400 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Update Lamp'}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-700 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete Lamp'}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:w-80 flex flex-col items-center bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-slate-300 font-semibold mb-4">Live Preview</h2>
            <LampVisual
              bulbType={selections.bulb_type}
              shadeStyle={selections.shade_style}
              baseMaterial={selections.base_material}
              colorTemp={selections.color_temp}
              brightness={selections.brightness}
            />
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm mb-1">Estimated Price</p>
              <p className="text-3xl font-bold text-green-400">${totalPrice}</p>
            </div>
            {incompatError && (
              <div className="mt-4 bg-red-900/40 border border-red-500 text-red-300 rounded-lg px-3 py-2 text-xs text-center">
                {incompatError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
