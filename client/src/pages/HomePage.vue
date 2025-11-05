<script setup>
import { AppState } from '@/AppState.js';
import Offcanvas from '@/components/Offcanvas.vue';
import { computed, watch } from 'vue';

const activeNotebook = computed(() => AppState.activeNotebook)

watch(activeNotebook, (newNotebook) => {
  if (newNotebook?.id) {
    return activeNotebook
  }
})

</script>

<template>
  <div>
    <Offcanvas />
    <div>{{ activeNotebook }}</div>
  </div>
</template>

<style scoped lang="scss">

</style>
