import { usePokemonStore } from "~/composables/pokemonStore";

export default async function getPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1')
    const data: PkmnState = await response.json()

    const {setPokemonData, pokemonData} = usePokemonStore()

    setPokemonData(data)
    return pokemonData
}