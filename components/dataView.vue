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
  <el-card class="row-span-3 col-start-3 col-end-7 backdrop-blur-xl bg-slate-900/20 border border-cyan-400/40 shadow-2xl flex items-center justify-center">
    <p class="text-3xl text-center">
      {{ dataEntry?.flavor_text_entries?.[1]?.flavor_text || 'No description available' }}
    </p>
  </el-card>
</template>