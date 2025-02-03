<script setup lang="ts">
import { Evolutions, PkmnState } from '~/utils/types';
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const { setPokemonData, pokemonData, setEvolutions } = usePokemonStore();

const search = ref<string | number | null>();
const isLoading = ref(false);
const error = ref<string | null>(null);
const pokemon = ref<PkmnState | null>(null);
const pkId = ref<number | null>(null);
const evolutions = ref<Evolutions | null>(null);

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
      pkId.value = data.id;

      const forms = await getEvolutions();
      if (forms) {
        evolutions.value = forms;
      }

      setPokemonData(data);
      return (pokemon.value = data);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
      throw error;
    }
  }
};

async function getEvolutions() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${pkId.value}/`,
    );

    if (!response.ok) {
      console.log('there is no data');
    } else {
      const data: Evolutions = await response.json();
      return data;
    }
  } catch (e) {
    console.error(e);
  }
}
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

    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div
      class="border h-full w-full p-5 bg-slate-300 grid grid-cols-7 grid-rows-7 gap-2"
    >
      <imagePortal :pokemon="pokemon" v-if="pokemon" />
      <InfoDisplay :pokemon="pokemon" v-if="pokemon" />
      <StatsDisplay :pokemon="pokemon" v-if="pokemon" />
      <dataView :evolutions="evolutions" v-if="pokemon" />
      <movesList :pokemon="pokemon" v-if="pokemon" />
    </div>
  </el-card>
</template>