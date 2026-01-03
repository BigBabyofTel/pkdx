<script lang="ts">
import { defineComponent } from 'vue';
import ControlPanel from './components/controlPanel.vue';

export default defineComponent({
  components: { ControlPanel },
});
</script>

<template>
  <div class="w-full min-h-screen">
    <ControlPanel />
  </div>
</template>
