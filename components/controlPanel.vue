<script setup lang="ts">
import { Evolutions, PkmnSpecies, PkmnState } from '~/utils/types';
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const { setPokemonData } = usePokemonStore();

const search = ref<string | number | null>();
const isLoading = ref(false);
const error = ref<string | null>(null);
const pokemon = ref<PkmnState | null>(null);
const pkId = ref<number | null>(null);
const evolutions = ref<Evolutions | null>(null);
const evoData = ref<string | null>();

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
      setPokemonData(data);

      const evolutions = await extractForms();
      console.log(evolutions);

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
    return data as PkmnSpecies;
  } catch (e) {
    console.error(e);
  }
}

async function extractForms() {
  try {
    const evoInfo = await getEvolution();
    if (evoInfo) {
      evoData.value = evoInfo?.evolution_chain.url;
    }

    const evoForms = await fetch(evoData.value as string);
    if (!evoForms.ok) console.error(error);

    const evolutionData: Evolutions = await evoForms.json();
    const forms = {
      firstForm: evolutionData.chain.evolves_to[0].species.name,
      secondForm: evolutionData.chain.evolves_to[0].evolves_to[0].species.name,
    };
    return forms ? forms : console.log('There are no forms');
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <el-card shadow="hover" class="h-[95vh]">
    <template #header>
      <div class="flex items-center">
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
      class="border h-[99vh] w-full p-5 bg-slate-300 grid grid-cols-7 grid-rows-4 gap-2"
    >
      <imagePortal :pokemon="pokemon" v-if="pokemon" />
      <InfoDisplay :pokemon="pokemon" v-if="pokemon" />
      <StatsDisplay :pokemon="pokemon" v-if="pokemon" />
      <dataView v-if="pokemon" />
      <movesList :pokemon="pokemon" v-if="pokemon" />
    </div>
  </el-card>
</template>