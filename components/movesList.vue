<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnState } from '../utils/types';
import { ref, watch } from 'vue';
import { getTypeColor } from '../utils/typeColors';

const props = defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>,
    required: true,
  },
});

interface MoveWithType {
  name: string;
  type: string;
}

const MAX_MOVES_TO_DISPLAY = 25;
const FALLBACK_TYPE = 'normal';

const movesWithTypes = ref<MoveWithType[]>([]);
const isLoading = ref(false);

// Format move name for display
const formatMoveName = (name: string): string => {
  return name.replace(/-/g, ' ');
};

// Validate that URL is from the expected Pokemon API domain
const isValidPokemonApiUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === 'pokeapi.co';
  } catch {
    return false;
  }
};

// Fetch move details to get type information
const fetchMoveTypes = async () => {
  if (!props.pokemon?.moves) return;

  isLoading.value = true;
  const movePromises = props.pokemon.moves
    .slice(0, MAX_MOVES_TO_DISPLAY)
    .map(async (move) => {
      try {
        const url = move.move.url as string;

        // Validate URL before making request
        if (!isValidPokemonApiUrl(url)) {
          console.error('Invalid Pokemon API URL:', url);
          return {
            name: move.move.name as string,
            type: FALLBACK_TYPE,
          };
        }

        const response = await fetch(url);
        if (!response.ok) {
          console.error('Failed to fetch move details:', response.statusText);
          return {
            name: move.move.name as string,
            type: FALLBACK_TYPE,
          };
        }

        const data = await response.json();
        return {
          name: move.move.name as string,
          type: data.type.name,
        };
      } catch (error) {
        console.error('Failed to fetch move:', error);
        return {
          name: move.move.name as string,
          type: FALLBACK_TYPE,
        };
      }
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
        <span class="text-gray-800 text-sm font-medium capitalize">{{
          formatMoveName(move.name)
        }}</span>
        <span
          :class="[
            getTypeColor(move.type),
            'text-white text-xs font-bold px-3 py-1 rounded-full capitalize',
          ]"
        >
          {{ move.type }}
        </span>
      </div>
    </div>
  </div>
</template>
