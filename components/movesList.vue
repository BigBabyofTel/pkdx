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
  <el-card class="row-start-1 row-span-9 col-start-7">
    <div class="overflow-auto">
      <ul>
        <li v-for="move in pokemon.moves" v-if="pokemon">
          {{ move.move.name }}
        </li>
      </ul>
    </div>
  </el-card>
</template>