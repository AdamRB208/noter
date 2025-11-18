<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const entry = computed(() => AppState.entries)

</script>


<template>
  <div>
    {{ entry }}
  </div>
</template>


<style lang="scss" scoped>

</style>