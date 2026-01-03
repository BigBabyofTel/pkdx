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
  <div class="w-full">
    <!-- Red background with Pokemon Image -->
    <div class="w-full bg-gradient-to-b from-red-500 to-red-400 pt-8 pb-16 flex justify-center relative">
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id as number}.png`"
        :alt="`Pokemon #${pokemon.id}`"
        class="w-64 h-64 object-contain relative z-10"
      >
      <!-- Curved white overlay -->
      <div class="absolute bottom-0 left-0 right-0 h-12 bg-white rounded-t-[3rem]" />
    </div>

    <!-- Pokemon Number, Name and Type Badges on white background -->
    <div class="w-full bg-white pt-4 pb-6 flex flex-col items-center">
      <h2 class="text-2xl font-bold text-gray-900 text-center">
        #{{ String(pokemon.id).padStart(3, '0') }} {{ getCapital(pokemon.name as string) }}
      </h2>
      
      <!-- Type Badges -->
      <div class="flex gap-2 mt-3">
        <span
          v-for="type in pokemon.types"
          :key="type.type.name"
          :class="[
            getTypeColor(type.type.name),
            'text-white text-xs font-bold px-4 py-1.5 rounded-full capitalize'
          ]"
        >
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </div>
</template>