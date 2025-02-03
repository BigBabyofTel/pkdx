<script setup lang="ts">
import type { PropType } from 'vue';
import { PkmnState } from '~/utils/types';

defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>, // Use PropType for complex types
    required: true, // This prop is required
  },
});
</script>

<template>
  <el-card class="row-start-1 row-end-4 col-start-3 col-end-7">
    <div>
      <ul>
        <li v-for="stat in pokemon.stats" key="stats">
          {{ stat.stat.name }} {{ stat.base_stat }}
        </li>
      </ul>
    </div>
  </el-card>
</template>