<script setup lang="ts">
import type { PropType } from 'vue';
import type { PkmnState } from '~/utils/types';
import { getCapital } from '~/utils/utils';
import { getTypeColor, getTypeColorValue } from '~/utils/typeColors';
import { computed } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>,
    required: true,
  },
});

// Compute background style based on Pokemon types
const backgroundStyle = computed(() => {
  const types = props.pokemon.types;
  const defaultColor = getTypeColorValue('normal');
  
  if (!types || types.length === 0) {
    return `background: linear-gradient(to bottom, ${defaultColor}, ${defaultColor}dd)`;
  }
  
  const firstTypeColor = getTypeColorValue(types[0]?.type?.name || 'normal');
  
  if (types.length === 1) {
    // Single type: use gradient with lighter shade (dd = ~87% opacity)
    return `background: linear-gradient(to bottom, ${firstTypeColor}, ${firstTypeColor}dd)`;
  } else {
    // Dual type: gradient with first type dominant (60% first type transitioning to second type)
    const secondTypeColor = getTypeColorValue(types[1]?.type?.name || 'normal');
    return `background: linear-gradient(135deg, ${firstTypeColor} 0%, ${firstTypeColor} 60%, ${secondTypeColor} 100%)`;
  }
});
</script>

<template>
  <div class="w-full">
    <!-- Dynamic background with Pokemon Image -->
    <div
      :style="backgroundStyle"
      class="w-full pt-8 md:pt-6 lg:pt-12 pb-16 md:pb-12 lg:pb-20 flex justify-center relative"
    >
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id as number}.png`"
        :alt="`Pokemon #${pokemon.id}`"
        class="w-64 h-64 md:w-80 md:h-80 lg:w-72 lg:h-72 object-contain relative z-10 transition-all"
      >
      <!-- Curved white overlay -->
      <div
        class="absolute bottom-0 left-0 right-0 h-12 md:h-8 lg:h-16 bg-white rounded-t-[3rem] lg:rounded-t-[4rem]"
      />
    </div>

    <!-- Pokemon Number, Name and Type Badges on white background -->
    <div class="w-full bg-white pt-4 md:pt-3 lg:pt-6 pb-6 md:pb-4 lg:pb-8 flex flex-col items-center">
      <h2 class="text-2xl md:text-lg lg:text-3xl font-bold text-gray-900 text-center">
        #{{ String(pokemon.id).padStart(3, '0') }}
        {{ getCapital(pokemon.name as string) }}
      </h2>

      <!-- Type Badges -->
      <div class="flex gap-2 mt-3 flex-wrap justify-center">
        <span
          v-for="type in pokemon.types"
          :key="type.type.name ?? 'unknown'"
          :class="[
            getTypeColor(type.type.name ?? 'normal'),
            'text-white text-xs md:text-xs lg:text-sm font-bold px-4 md:px-3 lg:px-5 py-1.5 md:py-1 lg:py-2 rounded-full capitalize',
          ]"
        >
          {{ type?.type?.name ?? 'unknown' }}
        </span>
      </div>
    </div>
  </div>
</template>
