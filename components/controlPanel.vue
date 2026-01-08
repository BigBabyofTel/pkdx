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
import FilterPanel from './filterPanel.vue';

const { setPokemonData } = usePokemonStore();

const search = ref<string | number | null>();
const isLoading = ref(false);
const error = ref<string | null>(null);
const pokemon = ref<PkmnState | null>(null);
const pkId = ref<number | null>(null);
const dataEntry = ref<PkmnSpecies | null>(null);
const showFilter = ref(false);

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

const goToNext = () => {
  if (pkId.value) {
    search.value = pkId.value + 1;
    handleSubmit();
  }
};
</script>

<template>
  <div class="w-full h-screen flex flex-col bg-white">
    <!-- Mobile & Tablet Portrait Header (hidden on tablet landscape) -->
    <div class="bg-red-500 px-4 py-3 flex items-center justify-between lg:hidden">
      <button
        class="flex items-center text-white gap-1 hover:opacity-80 transition-opacity"
        @click="goToPrevious"
      >
        <Icon name="material-symbols:arrow-back" size="20" />
        <span class="text-sm">Back</span>
      </button>

      <input
        :value="search"
        type="text"
        placeholder="Search Pokémon by name or ID"
        class="rounded-2xl p-2 text-sm flex-1 mx-2"
        @input="(e) => updateValue((e.target as HTMLInputElement).value)"
        @keydown.enter="handleSubmit"
      >
      <div class="flex items-center gap-2 text-white">
        <button class="hover:opacity-80 transition-opacity" @click="handleSubmit">
          <Icon name="material-symbols:search" size="20" />
        </button>
        <button
          class="hover:opacity-80 transition-opacity"
          @click="showFilter = !showFilter"
        >
          <Icon name="material-symbols:tune" size="20" />
        </button>
      </div>
    </div>

    <!-- Tablet Landscape Header (shown on large screens) -->
    <div class="hidden lg:flex bg-red-500 px-6 py-3 items-center justify-between">
      <div class="flex items-center gap-2">
        <button
          class="flex items-center text-white gap-1 hover:opacity-80 transition-opacity px-3 py-2"
          @click="goToPrevious"
        >
          <Icon name="material-symbols:arrow-back" size="20" />
          <span class="text-sm">Previous</span>
        </button>
        <button
          class="flex items-center text-white gap-1 hover:opacity-80 transition-opacity px-3 py-2"
          @click="goToNext"
        >
          <span class="text-sm">Next</span>
          <Icon name="material-symbols:arrow-forward" size="20" />
        </button>
      </div>

      <input
        :value="search"
        type="text"
        placeholder="Search Pokémon by name or ID"
        class="rounded-2xl p-2 text-sm flex-1 mx-4"
        @input="(e) => updateValue((e.target as HTMLInputElement).value)"
        @keydown.enter="handleSubmit"
      >
      <div class="flex items-center gap-2 text-white">
        <button class="hover:opacity-80 transition-opacity" @click="handleSubmit">
          <Icon name="material-symbols:search" size="20" />
        </button>
        <button
          class="hover:opacity-80 transition-opacity"
          @click="showFilter = !showFilter"
        >
          <Icon name="material-symbols:tune" size="20" />
        </button>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 text-red-700 px-4 py-2 text-center">
      {{ error }}
    </div>

    <!-- Main content area - Responsive Grid Layout -->
    <div class="flex-1 overflow-hidden bg-white">
      <!-- Mobile & Tablet Portrait: Single column vertical layout -->
      <div class="h-full overflow-y-auto lg:hidden">
        <div class="flex flex-col">
          <!-- Image Section -->
          <ImagePortal v-if="pokemon" :pokemon="pokemon" />

          <!-- Info Display (Height, Weight) -->
          <div v-if="pokemon" class="w-full bg-white px-4 md:px-6 py-4">
            <InfoDisplay :pokemon="pokemon" />
          </div>

          <!-- Stats Radar -->
          <div v-if="pokemon" class="w-full bg-white px-4 md:px-6 py-4">
            <StatsDisplay :pokemon="pokemon" />
          </div>

          <!-- Pokedex Entry Section -->
          <div v-if="dataEntry" class="w-full">
            <DataView :data-entry="dataEntry" />
          </div>

          <!-- Moves List Section -->
          <div v-if="pokemon" class="w-full">
            <MovesList :pokemon="pokemon" />
          </div>
        </div>
      </div>

      <!-- Tablet Landscape: Two-column layout -->
      <div class="hidden lg:flex h-full">
        <!-- Left column with image -->
        <div class="w-1/3 overflow-y-auto border-r border-gray-200">
          <ImagePortal v-if="pokemon" :pokemon="pokemon" />
        </div>

        <!-- Right column with scrollable details -->
        <div class="w-2/3 overflow-y-auto">
          <div class="flex flex-col divide-y divide-gray-100">
            <!-- Info Display (Height, Weight) -->
            <div v-if="pokemon" class="w-full bg-white px-6 py-4">
              <InfoDisplay :pokemon="pokemon" />
            </div>

            <!-- Stats Radar -->
            <div v-if="pokemon" class="w-full bg-white px-6 py-4">
              <StatsDisplay :pokemon="pokemon" />
            </div>

            <!-- Pokedex Entry Section -->
            <div v-if="dataEntry" class="w-full">
              <DataView :data-entry="dataEntry" />
            </div>

            <!-- Moves List Section -->
            <div v-if="pokemon" class="w-full">
              <MovesList :pokemon="pokemon" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Panel with Transition -->
    <Transition
      enter-active-class="transition-transform duration-300"
      leave-active-class="transition-transform duration-300"
      enter-from-class="-translate-x-full"
      leave-to-class="-translate-x-full"
    >
      <FilterPanel
        v-if="showFilter"
        @close="showFilter = false"
      />
    </Transition>
  </div>
</template>
