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
  <el-card class="row-start-1 row-end-3 col-start-3 col-end-7">
    <div>
      <ul>
        <li v-for="stat in pokemon.stats" :key="stat.stat.name">
          {{ stat.stat.name }} {{ stat.base_stat }}
        </li>
      </ul>
    </div>
  </el-card>
</template>