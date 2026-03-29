export default function FeatureSelector({ label, options, selected, onChange }) {
  return (
    <div className="mb-7">
      <p className="text-slate-300 font-semibold mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition ${
              selected === opt.value
                ? 'bg-amber-400 text-slate-900 border-amber-400'
                : 'border-slate-600 text-slate-300 hover:border-amber-400 hover:text-amber-400'
            }`}
          >
            {opt.label} {opt.price > 0 ? `(+$${opt.price})` : ''}
          </button>
        ))}
      </div>
    </div>
  );
}
