<script setup lang="ts">
import type { PkmnSpecies, PkmnState } from '../utils/types';
import { ref } from 'vue';
import { usePokemonStore } from '../composables/pokemonStore';
import { useDebounceFn } from '@vueuse/core';
import InfoDisplay from './infoDisplay.vue';
import StatsDisplay from './statsDisplay.vue';
import ImagePortal from './imagePortal.vue';
import DataView from './dataView.vue';
import MovesList from './movesList.vue';

const { setPokemonData } = usePokemonStore();

const search = ref<string | number | null>();
const isLoading = ref(false);
const error = ref<string | null>(null);
const pokemon = ref<PkmnState | null>(null);
const pkId = ref<number | null>(null);
const dataEntry = ref<PkmnSpecies | null>(null);

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
    console.error(err);
  }

  async function fetchData() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.value}`,
      );
      if (!response.ok) {
        console.error('Failed to fetch data');
      }
      await getEvolution();
      const data: PkmnState = await response.json();
      pkId.value = data.id;
      setPokemonData(data);
      return (pokemon.value = data);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
      throw error;
    }
  }
};

async function getEvolution(): Promise<PkmnSpecies | undefined> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pkId.value}/`,
    );
    if (!response.ok) console.error(error);
    const data = await response.json();
    dataEntry.value = data as PkmnSpecies;
    return data as PkmnSpecies;
  } catch (e) {
    console.error(e);
  }
}

const goToPrevious = () => {
  if (pkId.value && pkId.value > 1) {
    search.value = pkId.value - 1;
    handleSubmit();
  }
};

const goToNext = () => {
  if (pkId.value) {
    search.value = pkId.value + 1;
    handleSubmit();
  }
};
</script>

<template>
  <el-card shadow="hover" class="h-[95vh] w-full backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl">
    <template #header>
      <div class="flex items-center">
        <input
          :value="search"
          type="text"
          placeholder="Search Pokémon by name or ID..."
          class="p-3"
          @input="(e) => updateValue((e.target as HTMLInputElement).value)"
        >
        <button @click="handleSubmit">
          <Icon name="material-symbols:search" size="40" />
        </button>
        <button @click="goToPrevious">
          <Icon name="material-symbols:arrow-circle-left" size="40" />
        </button>
        <button @click="goToNext">
          <Icon name="material-symbols:arrow-circle-right" size="40" />
        </button>
      </div>
    </template>

    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div
      class="border h-[80vh] w-full p-5 bg-gradient-to-br from-slate-600 to-slate-800 grid grid-cols-7 grid-rows-4 gap-2"
    >
      <ImagePortal v-if="pokemon" :pokemon="pokemon" />
      <InfoDisplay v-if="pokemon" :pokemon="pokemon" />
      <StatsDisplay v-if="pokemon" :pokemon="pokemon" />
      <DataView v-if="dataEntry" :data-entry="dataEntry" />
      <MovesList v-if="pokemon" :pokemon="pokemon" />
    </div>
  </el-card>
</template>