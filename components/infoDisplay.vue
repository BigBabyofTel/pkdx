<script setup lang="ts">
const { pokemonData } = usePokemonStore();

const value = ref(true);

const weight = value
  ? getLbs(pokemonData.weight as number)
  : getKgs(pokemonData.weight as number);

const height = value
  ? getFeet(pokemonData.height as number, getCm)
  : getCm(pokemonData.height as number);
</script>

<template>
  <el-card class="row-start-4 row-span-6 col-start-1 col-end-2">
    <el-switch v-model="value" />
    <div>weight and height</div>
    {{ weight }}
    {{ height }}
  </el-card>
</template>