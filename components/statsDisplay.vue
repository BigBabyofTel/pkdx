<script setup lang="ts">
import { computed, type PropType, ref } from 'vue';
import type { PkmnState, Stats } from '~/utils/types';

const pokemon = defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>,
    required: true,
  },
});
const chartData = ref();
const chartOptions = ref();

const chartDataReact = computed(() => setChartData());
const chartOptionsReact = computed(() => setChartOptions());

const setChartData = () => {
  return (chartData.value = {
    labels: pokemon.pokemon.stats.map((stat: Stats) => stat.stat.name),
    datasets: [
      {
        data: pokemon.pokemon.stats.map((stat: Stats) => stat.base_stat),
        label: 'Base Stats',
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  });
};

const setChartOptions = () => {
  return (chartOptions.value = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <Chart
      type="radar"
      :data="chartDataReact"
      :options="chartOptionsReact"
      class="w-full max-w-sm md:max-w-md lg:max-w-sm"
    />
    <p class="text-xs text-gray-500 font-medium mt-2 uppercase tracking-wider">
      Stats Radar
    </p>
  </div>
</template>
