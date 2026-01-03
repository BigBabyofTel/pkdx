<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnState } from '../utils/types';
import { ref, watch } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>,
    required: true,
  },
});

// Type color mapping (same as imagePortal)
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

interface MoveWithType {
  name: string;
  type: string;
}

const movesWithTypes = ref<MoveWithType[]>([]);
const isLoading = ref(false);

// Fetch move details to get type information
const fetchMoveTypes = async () => {
  if (!props.pokemon?.moves) return;
  
  isLoading.value = true;
  const movePromises = props.pokemon.moves.slice(0, 10).map(async (move) => {
    try {
      const response = await fetch(move.move.url as string);
      if (response.ok) {
        const data = await response.json();
        return {
          name: move.move.name as string,
          type: data.type.name,
        };
      }
    } catch (error) {
      console.error('Failed to fetch move:', error);
    }
    return {
      name: move.move.name as string,
      type: 'normal', // fallback
    };
  });

  movesWithTypes.value = await Promise.all(movePromises);
  isLoading.value = false;
};

// Fetch when pokemon changes
watch(() => props.pokemon, fetchMoveTypes, { immediate: true });
</script>

<template>
  <div class="w-full bg-gray-50 px-6 py-6 border-t border-gray-200">
    <h3 class="text-base font-bold text-gray-900 mb-4">Moves</h3>
    <div v-if="isLoading" class="text-center text-gray-500 text-sm py-4">
      Loading moves...
    </div>
    <div v-else class="space-y-3 max-h-64 overflow-y-auto">
      <div
        v-for="move in movesWithTypes"
        :key="move.name"
        class="flex items-center justify-between py-2"
      >
        <span class="text-gray-800 text-sm font-medium capitalize">{{ move.name.replace('-', ' ') }}</span>
        <span
          :class="[
            getTypeColor(move.type),
            'text-white text-xs font-bold px-3 py-1 rounded-full capitalize'
          ]"
        >
          {{ move.type }}
        </span>
      </div>
    </div>
  </div>
</template>