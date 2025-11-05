<script setup>
import { AppState } from '@/AppState.js';
import Offcanvas from '@/components/Offcanvas.vue';
import { computed, watch } from 'vue';

const activeNotebook = computed(() => AppState.activeNotebook)

const backgroundStyle = computed(() => {
  if (activeNotebook.value?.coverImg) {
    return {
      backgroundImage: `url(${activeNotebook.value.coverImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  return {}
})

watch(activeNotebook, (newNotebook) => {
  if (newNotebook?.id) {
    return activeNotebook
  }
})

</script>

<template>
  <div class="section">
    <div class="row d-flex gap-5">
      <div class="col-md-3">
        <div>
          <Offcanvas />
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-center mt-4" :style="backgroundStyle">
          <h1>{{ activeNotebook?.title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
