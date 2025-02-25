<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnSpecies } from '../utils/types';

defineProps({
  dataEntry: {
    type: Object as PropType<PkmnSpecies | null>,
    required: true,
  },
});
</script>

<template>
  <el-card class="row-span-3 col-start-3 col-end-7">
    <p v-for="type in dataEntry.flavor_text_entries" :key="type.flavor_text">
      {{ type.flavor_text }}
    </p>
  </el-card>
</template>