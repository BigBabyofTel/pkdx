<script setup lang="ts">

/*
* This is for data fetching and sending to the other components
*
* */

import { usePokemonStore} from "~/composables/pokemonStore";

import getPokemon from "~/composables/pokemon";

const pokemon = await getPokemon()





</script>

<template>
    <el-card shadow="hover">
      <template #header>
        <h1 class="card-header">Hello panel</h1>
      </template>
      <div class="border h-full w-2/3 p-5 bg-slate-300">
        <slot />
        {{ pokemon }}
      </div>
    </el-card>
</template>