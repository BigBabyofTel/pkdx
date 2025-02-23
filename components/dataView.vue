<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnSpecies } from '../utils/types';

defineProps({
  data: {
    type: Object as PropType<PkmnSpecies | null>,
  },
});
</script>

<template>
  <el-card class="row-span-3 col-start-3 col-end-7">
    {{ data.flavor_text_entries[0].flavor_text }}
  </el-card>
</template>