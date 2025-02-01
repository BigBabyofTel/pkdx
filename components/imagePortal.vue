<script setup lang="ts">
import getPokemon from '~/composables/pokemon';
const { pokemonData, setPokemonData } = usePokemonStore();

const id = ref<number | null>(pokemonData.id);
const name = ref<string | null>(pokemonData.name);

const url = ref(
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
);
</script>

<template>
	<el-card
		shadow="always"
		class="col-start-1 col-end-3 row-start-1 row-end-4 w-full h-full"
	>
		<h1>{{ getCapital(name as string) }}</h1>
		<img :src="url" :alt="`Pokemon #${id}`" />
	</el-card>
</template>
