import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LampVisual from '../components/LampVisual';
import FeatureSelector from '../components/FeatureSelector';

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

const DEFAULTS = {
  bulb_type: 'LED',
  shade_style: 'Drum',
  base_material: 'Wood',
  color_temp: 'Warm White',
  brightness: 'Medium',
};

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

export default function Builder() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selections, setSelections] = useState(DEFAULTS);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const totalPrice = getPrice(selections);
  const incompatError = getIncompatibilityError(selections);

  const handleChange = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please give your lamp a name.');
    if (incompatError) return setError(incompatError);

    setSaving(true);
    try {
      const res = await fetch('/lamps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selections, name: name.trim(), total_price: totalPrice }),
      });
      const json = await res.json();
      if (!res.ok) return setError(json.error || 'Failed to save lamp.');
      navigate('/lamps');
    } catch {
      setError('Network error. Is the backend running?');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 px-8 py-12">
      <h1 className="text-3xl font-bold text-amber-400 mb-10 text-center">Build Your Lamp</h1>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left: Options */}
        <div className="flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="text-slate-300 font-semibold block mb-3">Lamp Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Cozy Corner Lamp"
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

            {(error || incompatError) && (
              <div className="bg-red-900/50 border border-red-500 text-red-300 rounded-lg px-4 py-3 mb-4 text-sm">
                {error || incompatError}
              </div>
            )}

            <button
              type="submit"
              disabled={saving || !!incompatError}
              className="w-full bg-amber-400 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-300 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {saving ? 'Saving...' : 'Save Lamp'}
            </button>
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
          <div className="mt-6 text-left w-full text-sm text-slate-400 space-y-2">
            <p><span className="text-slate-300">Bulb:</span> {selections.bulb_type}</p>
            <p><span className="text-slate-300">Shade:</span> {selections.shade_style}</p>
            <p><span className="text-slate-300">Base:</span> {selections.base_material}</p>
            <p><span className="text-slate-300">Color:</span> {selections.color_temp}</p>
            <p><span className="text-slate-300">Brightness:</span> {selections.brightness}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
