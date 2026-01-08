<script setup lang="ts">
import type { PkmnSpecies, PkmnState } from '../utils/types';
import { ref } from 'vue';
import { usePokemonStore } from '../composables/pokemonStore';
import { useDebounceFn } from '@vueuse/core';
import { getCapital, getKgs, getCm } from '../utils/utils';
import { getTypeColor } from '../utils/typeColors';
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

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 text-red-700 px-4 py-2 text-center lg:hidden">
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
        <!-- Left column with search, image, and basic info -->
        <div class="w-5/12 flex flex-col">
          <!-- Search Bar and Filter with blue background -->
          <div class="bg-blue-400 px-6 py-4 flex items-center gap-3">
            <div class="flex-1 relative">
              <Icon 
                name="material-symbols:search" 
                size="20" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                :value="search"
                type="text"
                placeholder="Search"
                class="w-full rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white border-2 border-white/30"
                @input="(e) => updateValue((e.target as HTMLInputElement).value)"
                @keydown.enter="handleSubmit"
              >
            </div>
            <button
              class="text-white hover:opacity-80 transition-opacity flex flex-col items-center gap-0.5"
              @click="showFilter = !showFilter"
            >
              <Icon name="material-symbols:tune" size="28" />
              <span class="text-xs font-medium">Filter</span>
            </button>
          </div>

          <!-- Pokemon Image, Name, and Info with blue background -->
          <div v-if="pokemon" class="flex-1 flex flex-col bg-gradient-to-b from-blue-400 to-blue-300 relative">
            <!-- Pokemon Image -->
            <div class="flex-1 flex items-center justify-center py-8">
              <img
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id as number}.png`"
                :alt="`Pokemon #${pokemon.id}`"
                class="w-80 h-80 object-contain drop-shadow-2xl"
              >
            </div>

            <!-- Curved white overlay -->
            <div class="absolute bottom-0 left-0 right-0 h-24 bg-white" style="border-radius: 50% 50% 0 0 / 30px 30px 0 0;" />
            
            <!-- Pokemon Name, Number and Type Badges -->
            <div class="relative z-10 bg-white pt-8 pb-4 flex flex-col items-center">
              <h2 class="text-3xl font-bold text-gray-900 text-center">
                #{{ String(pokemon.id).padStart(3, '0') }} {{ getCapital(pokemon.name as string) }}
              </h2>

              <!-- Type Badges -->
              <div class="flex gap-2 mt-3 flex-wrap justify-center">
                <span
                  v-for="type in pokemon.types"
                  :key="type.type.name ?? 'unknown'"
                  :class="[
                    getTypeColor(type.type.name ?? 'normal'),
                    'text-white text-sm font-bold px-5 py-1.5 rounded-full capitalize',
                  ]"
                >
                  {{ type?.type?.name ?? 'unknown' }}
                </span>
              </div>
            </div>

            <!-- Height and Weight at bottom -->
            <div class="relative z-10 bg-gray-100 px-6 py-4 flex items-center justify-around">
              <div class="text-center">
                <span class="text-base text-gray-700 font-medium">Height: {{ getCm(pokemon.height as number) }}cm</span>
              </div>
              <div class="text-center">
                <span class="text-base text-gray-700 font-medium">Weight: {{ getKgs(pokemon.weight as number) }}kg</span>
              </div>
            </div>
          </div>

          <!-- Empty state when no Pokemon -->
          <div v-else class="flex-1 bg-gradient-to-b from-blue-400 to-blue-300 flex items-center justify-center">
            <p class="text-white text-lg">Search for a Pokémon</p>
          </div>
        </div>

        <!-- Right column with navigation and scrollable details -->
        <div class="w-7/12 flex flex-col bg-white">
          <!-- Previous/Next Navigation -->
          <div class="bg-white px-6 py-4 flex items-center justify-end gap-3 border-b border-gray-200">
            <button
              class="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              @click="goToPrevious"
            >
              <Icon name="material-symbols:arrow-back" size="20" />
              <span class="text-sm font-medium">Previous</span>
            </button>
            <button
              class="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              @click="goToNext"
            >
              <span class="text-sm font-medium">Next</span>
              <Icon name="material-symbols:arrow-forward" size="20" />
            </button>
          </div>

          <!-- Scrollable content -->
          <div class="flex-1 overflow-y-auto">
            <div class="flex flex-col">
              <!-- Stats Radar -->
              <div v-if="pokemon" class="w-full bg-white px-6 py-6">
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
