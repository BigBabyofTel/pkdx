import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PkmnState } from '#imports';
import { Evolutions } from '~/utils/types';

export const usePokemonStore = defineStore('pkmn', () => {
  // state
  const pokemonData = ref<PkmnState>({
    name: null,
    height: null,
    weight: null,
    id: null,
    moves: [],
    sprites: {
      other: {
        official_artwork: {
          front_default: '',
        },
      },
    },
    stats: [],
    types: [],
    abilities: {
      ability: [{ name: null }],
    },
  });

  const evolutions = ref<Evolutions>({
    chain: {
      evolves_to: [
        {
          species: {
            name: null,
          },
          evolves_to: [
            {
              species: {
                name: null,
              },
            },
          ],
        },
      ],
    },
  });

  // actions
  const setPokemonData = (data: PkmnState) => {
    pokemonData.value = data;
  };

  const setEvolutions = (data: Evolutions) => {
    evolutions.value = data;
  };

  const clearPokemonData = () => {
    pokemonData.value = {
      name: null,
      height: null,
      weight: null,
      id: null,
      moves: [],
      sprites: {
        other: {
          official_artwork: {
            front_default: '',
          },
        },
      },
      stats: [],
      types: [],
      abilities: {
        ability: [{ name: null }],
      },
    };
  };

  return {
    pokemonData,
    setPokemonData,
    clearPokemonData,
    evolutions,
    setEvolutions,
  };
});