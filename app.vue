<script lang="ts">
import { defineComponent } from 'vue';
import ControlPanel from './components/controlPanel.vue';

export default defineComponent({
  components: { ControlPanel },
});
</script>

<template>
  <div class="h-[600px] flex flex-col items-center p-5">
    <div class="w-4/5 p-2 bg-red-300 h-screen">
      <ControlPanel />
    </div>
  </div>
</template>