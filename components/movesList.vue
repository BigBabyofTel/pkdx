<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnState } from '../utils/types';

defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>, // Use PropType for complex types
    required: true, // This prop is required
  },
});
</script>

<template>
  <el-scrollbar
    class="row-start-1 row-span-5 col-start-7 col-end-8 h-full w-full overflow-y-auto"
  >
    <el-card class="backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl">
      <ul>
        <li v-for="move in pokemon.moves" :key="move.move.name">
          {{ move.move.name }}
        </li>
      </ul>
    </el-card>
  </el-scrollbar>
</template>