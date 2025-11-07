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
      minHeight: '15rem',
      minWidth: '100%',
    }
  }
  return {}
})

const titleBackground = computed(() => {
  if (activeNotebook.value?.color) {
    return {
      backgroundColor: `${activeNotebook.value.color}`
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
      <div v-if="activeNotebook" class="col-md-6">
        <div class="d-flex justify-content-center mt-4 background-container" :style="backgroundStyle">
          <h2 class="mt-4 p-2" :style="titleBackground">{{ activeNotebook?.title }}</h2>
        </div>
        <div class="info-container">
          <p class="pt-2">Created By {{ activeNotebook?.creator.name }}</p>
          <div class="edit-details-container">
            <p>Created</p>
            <p>Last Updated</p>
          </div>
          <div class="buttons-container">
            <p class="d-flex justify-content-end">{{ activeNotebook?.entryCount }} entries</p>
            <button class="btn btn-outline-primary" type="button">edit</button>
            <button class="btn btn-outline-primary" type="button">delete</button>
            <button class="btn btn-outline-primary" type="button">new</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.background-container {
  position: relative
}

p {
  color: white;
  padding-left: 1em;
  font-size: small;
}
.info-container {
  display: flex;
  flex-direction: column;
    align-items: flex-start;
    height: 8rem;
    width: 100%;
      background-color: rgba(62, 62, 64, 0.867);
      position: relative;
      }
      
      .buttons-container {
        position: absolute;
        bottom: 2.5rem;
        right: 1rem;
      }
      
      button {
        margin-left: 1rem;
}

h2 {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 3.5rem;
  margin: 0;
  display: flex;
  align-items: center;
}
</style>
