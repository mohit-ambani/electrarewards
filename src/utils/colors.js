const colorMap = {
  'yellow-300': '#fde047', 'yellow-400': '#facc15', 'yellow-500': '#eab308',
  'amber-400': '#fbbf24', 'amber-500': '#f59e0b', 'amber-600': '#d97706',
  'amber-700': '#b45309', 'amber-800': '#92400e', 'amber-900': '#78350f',
  'orange-400': '#fb923c', 'orange-500': '#f97316', 'orange-700': '#c2410c',
  'red-500': '#ef4444', 'red-600': '#dc2626', 'red-700': '#b91c1c', 'red-800': '#991b1b',
  'rose-500': '#f43f5e', 'rose-700': '#be123c',
  'pink-500': '#ec4899', 'pink-700': '#be185d',
  'fuchsia-500': '#d946ef', 'fuchsia-600': '#c026d3',
  'purple-500': '#a855f7', 'purple-600': '#9333ea', 'purple-700': '#7c3aed',
  'violet-500': '#8b5cf6', 'violet-700': '#6d28d9',
  'indigo-400': '#818cf8', 'indigo-600': '#4f46e5', 'indigo-700': '#4338ca',
  'blue-400': '#60a5fa', 'blue-500': '#3b82f6', 'blue-600': '#2563eb',
  'blue-700': '#1d4ed8', 'blue-800': '#1e40af',
  'sky-400': '#38bdf8', 'sky-500': '#0ea5e9', 'sky-600': '#0284c7', 'sky-700': '#0369a1',
  'cyan-500': '#06b6d4', 'cyan-600': '#0891b2', 'cyan-700': '#0e7490',
  'teal-500': '#14b8a6', 'teal-700': '#0f766e',
  'emerald-500': '#10b981', 'emerald-600': '#059669', 'emerald-700': '#047857', 'emerald-800': '#065f46',
  'green-500': '#22c55e', 'green-600': '#16a34a', 'green-700': '#15803d', 'green-800': '#166534',
  'gray-300': '#d1d5db', 'gray-400': '#9ca3af', 'gray-500': '#6b7280',
  'gray-600': '#4b5563', 'gray-700': '#374151', 'gray-800': '#1f2937',
  'slate-400': '#94a3b8', 'slate-500': '#64748b', 'slate-600': '#475569',
  'slate-700': '#334155', 'slate-800': '#1e293b',
  'neutral-500': '#737373', 'neutral-700': '#404040',
  'stone-500': '#78716c', 'stone-700': '#44403c',
  'zinc-500': '#71717a', 'zinc-700': '#3f3f46',
};

export function twGradient(colorStr) {
  if (!colorStr) return 'linear-gradient(135deg, #333, #111)';
  const parts = colorStr.split(' ');
  const from = parts.find((p) => p.startsWith('from-'))?.replace('from-', '');
  const via = parts.find((p) => p.startsWith('via-'))?.replace('via-', '');
  const to = parts.find((p) => p.startsWith('to-'))?.replace('to-', '');
  const fromHex = colorMap[from] || '#333';
  const toHex = colorMap[to] || '#111';
  if (via) {
    const viaHex = colorMap[via] || fromHex;
    return `linear-gradient(135deg, ${fromHex}, ${viaHex}, ${toHex})`;
  }
  return `linear-gradient(135deg, ${fromHex}, ${toHex})`;
}

export default colorMap;
