<script setup lang="ts">
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const { setPokemonData } = usePokemonStore();

const search = ref<string | number | null>();
const isLoading = ref(false);
const error = ref<string | null>(null);

const updateValue = useDebounceFn((value: string | number | null) => {
	search.value = value;
}, 300);

const handleSubmit = async () => {
	if (!search.value) {
		error.value = 'Please enter a Pokémon name or ID.';
		return;
	}

	isLoading.value = true;
	error.value = null;

	try {
		const data = await fetchData(search.value);
		if (data) {
			console.log('Fetched Pokémon Data:', data);
		}
	} catch (err) {
		error.value = 'Failed to find Pokémon';
	} finally {
		isLoading.value = false;
	}
};

async function fetchData(value: string | number | null) {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
		if (!response.ok) throw new Error('No response');
		const data = await response.json();

		setPokemonData(data);
		return data;
	} catch (error) {
		console.error('Failed to fetch Pokémon:', error);
		throw error;
	}
}

</script>

<template>
	<el-card shadow="hover">
		<template #header>
			<div class="flex h-full items-center">
				<input
					v-model="search"
					type="text"
					placeholder="Search Pokémon by name or ID..."
					class="p-3"
				/>
				<button @click="handleSubmit" :disabled="isLoading">
					<Icon name="material-symbols:search" :size="40" />
				</button>
			</div>
		</template>

		<div v-if="isLoading" class="text-center">Loading...</div>

		<div v-if="error" class="text-red-500">{{ error }}</div>

		<div
			class="border h-full w-full p-5 bg-slate-300 grid grid-cols-7 grid-rows-7 gap-2"
		>
			<slot />
		</div>
	</el-card>
</template>
