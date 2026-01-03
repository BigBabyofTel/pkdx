<script setup lang="ts">
import type { PkmnState } from '../utils/types';
import { getLbs, getKgs, getFeet, getCm } from '../utils/utils';
import type { PropType } from 'vue';
import { ref, computed } from 'vue';

const pokemon = defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>,
    required: true,
  },
});

const value = ref<boolean>(false);

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

const heavy = computed(() => (value.value ? `lbs` : `kg`));
const tall = computed(() => (value.value ? `ft` : `cm`));
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Unit Toggle -->
    <div class="flex items-center justify-center gap-2">
      <span class="text-xs text-gray-600">{{ value ? 'Imperial' : 'Metric' }}</span>
      <el-switch v-model="value" />
    </div>

    <!-- Height and Weight -->
    <div class="bg-gray-100 rounded-lg p-3 text-center">
      <div class="text-xs text-gray-600 mb-1">Height</div>
      <div class="text-lg font-bold text-gray-800">{{ height }}{{ tall }}</div>
    </div>

    <div class="bg-gray-100 rounded-lg p-3 text-center">
      <div class="text-xs text-gray-600 mb-1">Weight</div>
      <div class="text-lg font-bold text-gray-800">{{ weight }}{{ heavy }}</div>
    </div>
  </div>
</template>