// Maps shade style → shade color
const SHADE_COLORS = {
  Drum: '#f59e0b',
  Empire: '#a78bfa',
  Bell: '#34d399',
  'No Shade': 'transparent',
};

// Maps color temp → bulb glow color
const BULB_GLOW = {
  'Warm White': '#fef3c7',
  'Cool White': '#e0f2fe',
  Daylight: '#f0fdf4',
  RGB: '#fce7f3',
};

// Maps base material → base color
const BASE_COLORS = {
  Wood: '#92400e',
  Metal: '#64748b',
  Ceramic: '#fda4af',
  Glass: '#7dd3fc',
};

// Maps brightness → glow opacity
const BRIGHTNESS_OPACITY = {
  Low: 0.2,
  Medium: 0.45,
  High: 0.7,
  Ultra: 0.95,
};

export default function LampVisual({ bulbType, shadeStyle, baseMaterial, colorTemp, brightness }) {
  const shadeColor = SHADE_COLORS[shadeStyle] || '#f59e0b';
  const glowColor = BULB_GLOW[colorTemp] || '#fef3c7';
  const baseColor = BASE_COLORS[baseMaterial] || '#64748b';
  const glowOpacity = BRIGHTNESS_OPACITY[brightness] || 0.45;
  const hasShade = shadeStyle !== 'No Shade';

  return (
    <svg width="160" height="200" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glow halo behind bulb */}
      <circle cx="80" cy="110" r="40" fill={glowColor} opacity={glowOpacity} />

      {/* Shade */}
      {hasShade && (
        <polygon
          points={
            shadeStyle === 'Bell'
              ? '25,100 135,100 110,30 50,30'
              : shadeStyle === 'Empire'
              ? '30,100 130,100 105,30 55,30'
              : '20,100 140,100 115,30 45,30'
          }
          fill={shadeColor}
          opacity="0.95"
        />
      )}

      {/* Bulb */}
      <circle cx="80" cy="110" r="18" fill={glowColor} stroke="#fbbf24" strokeWidth="2" />

      {/* Filament detail (only for Incandescent) */}
      {bulbType === 'Incandescent' && (
        <path d="M75,108 Q80,102 85,108 Q80,114 75,108" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
      )}

      {/* Stem */}
      <rect x="76" y="128" width="8" height="38" fill="#94a3b8" rx="2" />

      {/* Base */}
      <ellipse cx="80" cy="168" rx="28" ry="10" fill={baseColor} />
      <rect x="56" y="162" width="48" height="10" fill={baseColor} rx="3" />
    </svg>
  );
}
