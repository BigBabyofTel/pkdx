<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnSpecies } from '../utils/types';

defineProps({
  dataEntry: {
    type: Object as PropType<PkmnSpecies | null>,
    required: true,
  },
});
</script>

<template>
  <div class="w-full max-w-2xl bg-white px-4 py-4 mx-auto">
    <h3 class="text-lg font-bold text-gray-800 mb-3">Pokedex Entry</h3>
    <p class="text-gray-700 text-sm leading-relaxed">
      {{ dataEntry?.flavor_text_entries?.[1]?.flavor_text || 'No description available' }}
    </p>
  </div>
</template>