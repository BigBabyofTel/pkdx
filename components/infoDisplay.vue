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
      <span class="text-xs text-gray-600">{{
        value ? 'Imperial' : 'Metric'
      }}</span>
      <el-switch v-model="value" />
    </div>

    <!-- Height and Weight Side by Side -->
    <div class="grid grid-cols-2 gap-4">
      <div class="text-center">
        <div class="text-sm text-gray-600 mb-1 font-medium">
          Height: {{ height }}{{ tall }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-sm text-gray-600 mb-1 font-medium">
          Weight: {{ weight }}{{ heavy }}
        </div>
      </div>
    </div>
  </div>
</template>
