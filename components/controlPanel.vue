<script setup lang="ts">
import { PkmnState } from '~/utils/types';
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import imagePortal from './imagePortal.vue';

const { setPokemonData, pokemonData } = usePokemonStore();

const search = ref<string | number | null>();
const isLoading = ref(false);
const error = ref<string | null>(null);
const pokemon = ref<PkmnState | null>(null);

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
    const data = await fetchData();
    if (data) {
      setPokemonData(data);
      console.log('Fetched Pokémon Data:', data);
    }
  } catch (err) {
    error.value = 'Failed to find Pokémon';
  }

  async function fetchData() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.value}`,
      );
      if (!response.ok) {
        console.error('Failed to fetch data');
      }
      const data: PkmnState = await response.json();

      setPokemonData(data);
      pokemon.value = data;
      return data;
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
      throw error;
    }
  }
};
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="flex h-full items-center">
        <input
          :value="search"
          type="text"
          @input="(e) => updateValue((e.target as HTMLInputElement).value)"
          placeholder="Search Pokémon by name or ID..."
          class="p-3"
        />
        <button @click="handleSubmit">
          <Icon name="material-symbols:search" :size="40" />
        </button>
      </div>
    </template>

    <div v-if="isLoading" class="text-center">Loading...</div>

    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div
      class="border h-full w-full p-5 bg-slate-300 grid grid-cols-7 grid-rows-7 gap-2"
    >
      <imagePortal v-if="pokemon" :pokemon="pokemon" />
    </div>
  </el-card>
</template>