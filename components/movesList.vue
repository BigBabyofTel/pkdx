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

<template class="overflow-y-scroll">
  <el-card class="row-start-1 row-span-3 col-start-6 col-end-8">
    <div class="">
      <ul>
        <li v-for="move in pokemon.moves" v-if="pokemon">
          {{ move.move.name }}
        </li>
      </ul>
    </div>
  </el-card>
</template>