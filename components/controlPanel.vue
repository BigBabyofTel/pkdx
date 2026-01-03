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
      const data: PkmnState = await response.json();
      pkId.value = data.id;
      setPokemonData(data);
      pokemon.value = data;

      // Fetch species data in parallel
      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data.id}/`,
      );
      if (speciesResponse.ok) {
        const speciesData = await speciesResponse.json();
        dataEntry.value = speciesData as PkmnSpecies;
      }

      return pokemon.value;
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
      throw error;
    }
  }
};

const goToPrevious = () => {
  if (pkId.value && pkId.value > 1) {
    search.value = pkId.value - 1;
    handleSubmit();
  }
};

// ...existing code...
</script>

<template>
  <div class="w-full h-screen flex flex-col bg-white">
    <!-- Header with navigation and search controls -->
    <div class="bg-red-500 text-white px-4 py-3 flex items-center justify-between">
      <button class="flex items-center gap-1 hover:opacity-80" @click="goToPrevious">
        <Icon name="material-symbols:arrow-back" size="20" />
        <span class="text-sm">Back</span>
      </button>
      <div class="flex items-center gap-3">
        <button class="hover:opacity-80" @click="handleSubmit">
          <Icon name="material-symbols:search" size="20" />
        </button>
        <button class="hover:opacity-80">
          <Icon name="material-symbols:tune" size="20" />
        </button>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 text-red-700 px-4 py-2 text-center">
      {{ error }}
    </div>

    <!-- Search bar (hidden but functional) -->
    <input
      :value="search"
      type="text"
      placeholder="Search Pokémon by name or ID..."
      class="hidden"
      @input="(e) => updateValue((e.target as HTMLInputElement).value)"
      @keydown.enter="handleSubmit"
    >

    <!-- Main content area -->
    <div class="flex-1 overflow-y-auto bg-gradient-to-b from-red-500 to-white">
      <div class="flex flex-col items-center">
        <!-- Image Section -->
        <ImagePortal v-if="pokemon" :pokemon="pokemon" />

        <!-- Info and Stats Section (side by side) -->
        <div v-if="pokemon" class="w-full bg-white">
          <div class="max-w-2xl mx-auto grid grid-cols-2 gap-4 px-4 py-4">
            <!-- Info Display (Height, Weight) -->
            <InfoDisplay :pokemon="pokemon" />

            <!-- Stats Radar -->
            <StatsDisplay :pokemon="pokemon" />
          </div>
        </div>

        <!-- Pokedex Entry Section -->
        <DataView v-if="dataEntry" :data-entry="dataEntry" />

        <!-- Moves List Section -->
        <MovesList v-if="pokemon" :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>