<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnState } from '../utils/types';
import { getCapital } from '../utils/utils';

defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>,
    required: true,
  },
});

// Type color mapping
const typeColors: Record<string, string> = {
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

const getTypeColor = (typeName: string) => typeColors[typeName] || 'bg-gray-400';
</script>

<template>
  <div class="w-full bg-gradient-to-b from-red-500 to-red-400 pt-8 pb-6 flex flex-col items-center">
    <!-- Pokemon Image -->
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id as number}.png`"
      :alt="`Pokemon #${pokemon.id}`"
      class="w-48 h-48 object-contain"
    >

    <!-- Pokemon Number and Name -->
    <div class="text-center mt-4">
      <p class="text-gray-700 font-bold text-sm">
        #{{ String(pokemon.id).padStart(3, '0') }} {{ getCapital(pokemon.name as string) }}
      </p>
    </div>

    <!-- Type Badges -->
    <div class="flex gap-2 mt-2">
      <span
        v-for="type in pokemon.types"
        :key="type.type.name"
        :class="[
          getTypeColor(type.type.name),
          'text-white text-xs font-bold px-3 py-1 rounded-full'
        ]"
      >
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>