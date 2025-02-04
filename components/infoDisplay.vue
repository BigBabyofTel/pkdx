<script setup lang="ts">
const { pokemonData } = usePokemonStore();

const value = ref<boolean>(false);
// using computed properties react to value changes automatically
const weight = computed(() =>
  value.value
    ? getLbs(pokemonData.weight as number)
    : getKgs(pokemonData.weight as number),
);

const height = computed(() =>
  value.value
    ? getFeet(pokemonData.height as number, getCm)
    : getCm(pokemonData.height as number),
);
const toggleBoolean = () => {
  value.value = !value.value;
};
</script>

<template>
  <el-card class="row-start-3 row-span-1 col-start-1 col-end-3">
    <el-switch v-model="value" />
    <div>weight and height</div>
    {{ weight }}
    {{ height }}
  </el-card>
</template>