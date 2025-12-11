<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import type { PkmnState } from '../utils/types';
import type { PropType } from 'vue';

const pokemon = defineProps({
  pokemon: {
    type: Object as PropType<PkmnState>, // Use PropType for complex types
    required: true, // This prop is required
  },
});

const chartData = ref();
const chartOptions = ref();

const chartDataReact = computed(() => setChartData());
const chartOptionsReact = computed(() => setChartOptions());

const setChartData = () => {
  return (chartData.value = {
    labels: pokemon.pokemon.stats.map((stat) => stat.stat.name),
    datasets: [
      {
        data: pokemon.pokemon.stats.map((stat) => stat.base_stat),
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
  <el-card class="row-start-1 row-end-3 col-start-3 col-end-7 backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl">
    <div>
      <Chart
        type="radar"
        :data="chartDataReact"
        :options="chartOptionsReact"
        class="w-fit"
      />
    </div>
  </el-card>
</template>