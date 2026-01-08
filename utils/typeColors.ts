// Type color mapping for Pokemon types
export const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-blue-400',
  psychic: 'bg-purple-600',
  bug: 'bg-green-600',
  rock: 'bg-gray-600',
  ghost: 'bg-purple-700',
  dragon: 'bg-purple-800',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-500',
};

// Raw color values for gradient backgrounds
export const typeColorValues: Record<string, string> = {
  normal: '#9ca3af',
  fire: '#ef4444',
  water: '#3b82f6',
  grass: '#22c55e',
  electric: '#facc15',
  ice: '#22d3ee',
  fighting: '#b91c1c',
  poison: '#a855f7',
  ground: '#ca8a04',
  flying: '#60a5fa',
  psychic: '#9333ea',
  bug: '#16a34a',
  rock: '#4b5563',
  ghost: '#7e22ce',
  dragon: '#6b21a8',
  dark: '#1f2937',
  steel: '#6b7280',
  fairy: '#ec4899',
};

export const getTypeColor = (typeName: string): string => {
  return typeColors[typeName] || 'bg-gray-400';
};

export const getTypeColorValue = (typeName: string): string => {
  return typeColorValues[typeName] || '#9ca3af';
};
