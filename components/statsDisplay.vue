<script setup lang="ts">
import getPokemon from '~/composables/pokemon';

const { pokemonData } = usePokemonStore();

const stats = ref(pokemonData.stats)

onMounted(async () => {
	await getPokemon();
});

</script>

<template>
	<el-card class="row-start-1 row-end-4 col-start-3 col-end-7">
		<div>
<ul>
	<li v-for="stat in stats" key="stats">
		{{ stat.stat.name }} {{ stat.base_stat }}
	</li>
</ul>
		</div>
	</el-card>
</template>
