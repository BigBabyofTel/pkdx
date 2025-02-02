<script setup lang="ts">
import type { PropType } from 'vue';
import { PkmnState } from '~/utils/types';

defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>, // Use PropType for complex types
    required: true, // This prop is required
  },
});

const { pokemonData } = usePokemonStore();

const url = ref(
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id as number}.png`,
);
</script>

<template>
  <el-card
    shadow="always"
    class="col-start-1 col-end-3 row-start-1 row-end-4 w-full h-full"
  >
    <h1>{{ getCapital(pokemon.name as string) }}</h1>
    <img :src="url" :alt="`Pokemon #${pokemon.id}`" />
  </el-card>
</template>