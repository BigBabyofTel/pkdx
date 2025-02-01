import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PkmnState } from '#imports';

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

	// actions
	const setPokemonData = (data: PkmnState) => {
		pokemonData.value = data;
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
	};
});
