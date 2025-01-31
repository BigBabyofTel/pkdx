import { ref } from 'vue'
import { usePokemonStore } from "~/composables/pokemonStore";

export default async function getPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1')
    const data: PkmnState = await response.json()
    return {
        name: data.name,
        height: data.height,
        weight: data.weight,
        id: data.id,
        types: data.types,
        abilities: data.abilities,
        sprites: data.sprites.others["official_artwork"].front_default.toString(),
        stats: data.stats,
        moves: data.moves
    }
}