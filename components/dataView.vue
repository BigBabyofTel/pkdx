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
  <div class="w-full bg-gray-50 px-6 py-6">
    <h3 class="text-base font-bold text-gray-900 mb-3">Pokedex Entry</h3>
    <p class="text-gray-700 text-sm leading-relaxed">
      {{ dataEntry?.flavor_text_entries?.[1]?.flavor_text || 'No description available' }}
    </p>
  </div>
</template>