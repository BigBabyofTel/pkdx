<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnState } from '../utils/types';


defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>,
    required: true,
  },
});
</script>

<template>
  <div class="w-full max-w-2xl bg-white px-4 py-4 mx-auto border-t">
    <h3 class="text-lg font-bold text-gray-800 mb-3">Moves</h3>
    <div class="space-y-2 max-h-64 overflow-y-auto">
      <div
        v-for="move in pokemon.moves.slice(0, 10)"
        :key="move.move.name"
        class="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
      >
        <span class="text-gray-800 text-sm font-medium">{{ move.move.name }}</span>
      </div>
      <div v-if="pokemon.moves.length > 10" class="text-xs text-gray-500 text-center py-2">
        Showing 10 of {{ pokemon.moves.length }} moves
      </div>
    </div>
  </div>
</template>