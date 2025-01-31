<script setup lang="ts">

/*
* This is for data fetching and sending to the other components
*
* */





</script>

<template>
    <el-card shadow="hover">
      <template #header>
        <h1 class="card-header">Hello panel</h1>
      </template>
      <div class="border h-full w-2/3 p-5 bg-slate-300">
        <slot />
      </div>
    </el-card>
</template>