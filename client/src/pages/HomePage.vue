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
      backgroundPosition: 'center',
      height: '15rem',
      width: '35rem',
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
        <div class="d-flex justify-content-center mt-4 background-container" :style="backgroundStyle">
          <h2 class="mt-4 p-2">{{ activeNotebook?.title }}</h2>
        </div>
        <div class="info-container">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.background-container {
  position: relative
}

.info-container {
  height: 8rem;
  width: 35rem;
  background-color: rgba(62, 62, 64, 0.524);
}

h2 {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(62, 62, 64, 0.524);
  height: 3.5rem;
  margin: 0;
  display: flex;
  align-items: center;
}
</style>
