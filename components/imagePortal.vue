<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnState } from '~/utils/types';

defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>, // Use PropType for complex types
    required: true, // This prop is required
  },
});
</script>

<template>
  <el-card
    shadow="always"
    class="col-start-1 col-end-3 row-start-1 row-end-3 w-full h-full"
  >
    <h1>{{ getCapital(pokemon.name as string) }}</h1>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id as number}.png`"
      :alt="`Pokemon #${pokemon.id}`"
      class="w-4/5 mx-auto"
    >
  </el-card>
</template>