<script setup lang="ts">
import getPokemon from '~/composables/pokemon';

const { pokemonData } = usePokemonStore();


const moves = ref(pokemonData.moves);

onMounted(async () => {
	await getPokemon();
});
</script>

<template>
	<el-card class="row-start-1 row-span-9 col-start-7">
		<div class="overflow-auto">
			<ul>
				<li v-for="move in moves">
					{{ move.move.name }}
				</li>
			</ul>
		</div>
	</el-card>
</template>
