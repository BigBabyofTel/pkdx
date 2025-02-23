<script setup lang="ts">
import type { PkmnState } from '../utils/types';
import { getLbs, getKgs, getFeet, getCm } from '../utils/utils';
import type { PropType } from 'vue';
import { computed, ref } from 'vue';

const pokemon = defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>,
    required: true,
  },
});

const value = ref<boolean>(false);

// using computed properties react to value changes automatically
const weight = computed(() =>
  value.value
    ? getLbs(pokemon.pokemon.weight as number)
    : getKgs(pokemon.pokemon.weight as number),
);

const height = computed(() =>
  value.value
    ? getFeet(pokemon.pokemon.height as number, getCm)
    : getCm(pokemon.pokemon.height as number),
);

const heavy = computed(() => (value.value ? `lbs` : `Kgs`));
const tall = computed(() => (value.value ? `Feet` : `Cm`));
</script>

<template>
  <el-card class="row-start-3 row-span-3 col-start-1 col-end-3">
    <el-switch v-model="value" />
    <div class="flex flex-col">
      <span> Weight: {{ weight }} {{ heavy }} </span>
      <span> Height: {{ height }} {{ tall }} </span>
      Ability:
      <span
        v-for="ability in pokemon.pokemon.abilities"
        :key="ability.ability.name"
      >
        {{ ability.ability.name }}
      </span>
      Type:
      <span v-for="type in pokemon.pokemon.types" :key="type.type.name">
        {{ type.type.name }}
      </span>
    </div>
  </el-card>
</template>