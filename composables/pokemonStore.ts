import { defineStore} from 'pinia'

export interface PkmnState {
    name: string | null;
    height: number | null;
    id: number | null;
    abilities: {
        ability: [{
            name: string | null; }]
    };
    sprites: {
        other?: {
            official_artwork: {
                front_default: string;
            };
        };
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    weight: number | null;
    moves: {
        move: {
            name: string | null;
            url: string | null;
        };
    }[];
}

export const usePokemonStore = defineStore('pkmn', () => {
   // state
    const pokemonData = ref<PkmnState>({
        name: null,
        height: null,
        weight: null,
        id: null,
        moves: [],
        sprites:  {
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
    })

    // actions
    const setPokemonData = (data: PkmnState) => {
        pokemonData.value = data;
    }

    const clearPokemonData = () => {
        pokemonData.value = {
            name: null,
            height: null,
            weight: null,
            id: null,
            moves: [],
            sprites:  {
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
        clearPokemonData
    }

})