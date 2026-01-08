<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{
  close: [];
}>();

// Filter options - Design only, no logic yet
const types = [
  'Normal',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy',
];

const selectedTypes = ref<string[]>([]);
const minStat = ref<number>(0);
const maxStat = ref<number>(150);
</script>

<template>
  <!-- Filter Panel Overlay Backdrop -->
  <div class="fixed inset-0 z-40 md:hidden" @click="$emit('close')">
    <div
      class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
    />
  </div>

  <!-- Filter Panel Slide-out Container -->
  <div
    class="fixed left-0 top-0 h-screen w-80 bg-white z-50 overflow-y-auto shadow-lg transition-transform duration-300"
  >
    <!-- Header -->
    <div
      class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
    >
      <h2 class="text-lg font-bold text-gray-900">Filters</h2>
      <button
        class="text-gray-500 hover:text-gray-700 transition-colors"
        @click="$emit('close')"
      >
        <Icon name="material-symbols:close" size="24" />
      </button>
    </div>

    <!-- Filter Content -->
    <div class="px-6 py-6 space-y-6">
      <!-- Type Filter -->
      <div>
        <h3 class="text-base font-bold text-gray-900 mb-3">Type</h3>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          <div v-for="type in types" :key="type" class="flex items-center">
            <input
              :id="`type-${type}`"
              :checked="selectedTypes.includes(type)"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-red-500"
              @change="
                (e) => {
                  if ((e.target as HTMLInputElement).checked) {
                    selectedTypes.push(type);
                  } else {
                    selectedTypes = selectedTypes.filter((t) => t !== type);
                  }
                }
              "
            >
            <label
              :for="`type-${type}`"
              class="ml-2 text-sm text-gray-700 cursor-pointer"
            >
              {{ type }}
            </label>
          </div>
        </div>
      </div>

      <!-- Stat Range Filter -->
      <div>
        <h3 class="text-base font-bold text-gray-900 mb-3">
          Base Stat Range
        </h3>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-600 font-medium">
              Minimum: {{ minStat }}
            </label>
            <input
              v-model.number="minStat"
              type="range"
              min="0"
              max="150"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>
          <div>
            <label class="text-xs text-gray-600 font-medium">
              Maximum: {{ maxStat }}
            </label>
            <input
              v-model.number="maxStat"
              type="range"
              min="0"
              max="150"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>
        </div>
      </div>

      <!-- Abilities Filter (placeholder) -->
      <div>
        <h3 class="text-base font-bold text-gray-900 mb-3">Abilities</h3>
        <p class="text-sm text-gray-500">More abilities coming soon</p>
      </div>

      <!-- Reset Button -->
      <button
        class="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 rounded-lg transition-colors"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

