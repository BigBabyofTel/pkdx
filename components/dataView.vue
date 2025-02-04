<script setup lang="ts">
import { Evolutions, PkmnState } from '~/utils/types';
import type { PropType } from 'vue';

defineProps({
  evolutions: {
    type: Object as PropType<Evolutions | null>, // Use PropType for complex types
    required: true, // This prop is required
  },
});
</script>

<template>
  <el-card class="row-span-1 col-start-3 col-end-6">
    <div>
      <figure>
        {{ evolutions?.chain.evolves_to[0].species.name }}
        {{ evolutions?.chain.evolves_to[0].evolves_to[0].species.name }}
      </figure>
    </div>
  </el-card>
</template>